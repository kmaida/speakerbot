const UserHome = require('./UserHome');

/*------------------
   USER HOME API
------------------*/

const dbErrHandler = (err) => {
  return new Error(`USERHOME DB Error: ${err.message || err}`);
};

const userHome = {
  /**
   * Get all user home objects
   * @return {object[]} array of user home objects containing user and view IDs
   */
  async getUserHomes() {
    return UserHome.find({}, (err, userHomes) => {
      if (err) return dbErrHandler(err);
      if (!userHomes) return new Error('No user homes found');
      return userHomes;
    });
  },
  /**
   * Set user home view if it doesn't already exist
   * @param {string} userID
   * @param {string} viewID
   * @return {object} promise: new saved user home object
   */
  async setUserHomeView(userID, viewID) {
    return UserHome.findOne({ userID }, (err, userHome) => {
      if (err) return dbErrHandler(err);
      if (!viewID) return new Error('No view ID provided');
      // If userHome doesn't exist, create it
      if (!userHome) {
        const newUserHome = new UserHome({
          userID: userID,
          viewID: viewID
        });
        newUserHome.save((err) => {
          if (err) return dbErrHandler(err);
          return newUserHome;
        });
      }
      // If userHome exists but the viewID doesn't match, update it
      else if (userHome.viewID !== viewID) {
        userHome.viewID = viewID;
        userHome.save((err) => {
          if (err) return dbErrHandler(err);
          console.log('USERHOME DB: succesfully updated user\'s viewID', userHome.viewID);
          return userHome;
        })
      }
      // If userHome exists and viewID matches, return userHome
      else {
        return userHome;
      }
    });
  }
};

module.exports = userHome;
