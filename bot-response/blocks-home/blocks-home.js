/*------------------
 BLOCKS: APP HOME
------------------*/

const blocksHome = async (homeParams, at) => {
  if (homeParams) {
    const isUserAdmin = homeParams.admins ? homeParams.admins.indexOf(homeParams.userID) > -1 : false;
    // Blocks Composition
    const introBlocks = require('./blocks-home-intro')(homeParams);
    const useBlocks = require('./blocks-home-use')();
    const adminBlocks = isUserAdmin ? require('./blocks-home-admin')(homeParams) : [];
    const buttonBlocks = require('./../blocks-home/blocks-home-buttons')(homeParams);
    const reportBlocks = await at.getPastEventsNeedReport(homeParams);
    const eventBlocks = await at.getUserEvents(homeParams);
    const detailsBlocks = require('./blocks-home-details')(homeParams);
    const footerBlocks = require('./blocks-home-footer');

    // Concat arrays and return appropriate configuration
    const allBlocks = introBlocks
      .concat(buttonBlocks)
      .concat(useBlocks)
      .concat(adminBlocks)
      .concat(reportBlocks)
      .concat(eventBlocks)
      .concat(detailsBlocks)
      .concat(footerBlocks);
    // Return all composed blocks
    return allBlocks;
  }
};

module.exports = blocksHome;
