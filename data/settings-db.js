const Settings = require('./Settings');

/*------------------
   SETTINGS API
------------------*/

const dbErrHandler = (err) => {
  return new Error(`SETTINGS DB Error: ${err.message || err}`);
};

const settings = {
  /**
   * Initialize and set settings from ENV if there are no settings
   * @return {object} promise: settings object
   */
  async initSettings() {
    return Settings.findOne({}, (err, settings) => {
      if (err) return dbErrHandler(err);
      if (!settings) {
        const newSettings = new Settings({
          channel: process.env.SLACK_CHANNEL_ID,
          admins: process.env.SLACK_ADMINS.split(',')
        });
        newSettings.save((err) => {
          if (err) return dbErrHandler(err);
          return newSettings;
        });
      }
    });
  },
  /**
   * Get settings object
   * @return {object} promise: settings object
   */
  async getSettings() {
    return Settings.findOne({}, (err, settings) => {
      if (err) return dbErrHandler(err);
      if (!settings) return new Error('No settings are saved');
      return settings;
    });
  },
  /**
   * Save reporting channel to store
   * @param {string} channel channel to save to DB
   * @return {object} promise: settings object
   */
  async setChannel(channel) {
    return Settings.findOne({}, (err, settings) => {
      if (err) return dbErrHandler(err);
      if (!channel) return new Error('No channel provided');
      // No settings exist yet; save new settings document
      if (!settings) {
        const newSettings = new Settings({
          channel: channel,
          admins: process.env.SLACK_ADMINS.split(',')
        });
        newSettings.save((err) => {
          if (err) return dbErrHandler(err);
          return newSettings;
        });
      }
      // Update existing settings object
      else {
        settings.channel = channel;
        settings.save((err) => {
          if (err) return dbErrHandler(err);
          console.log('SETTINGS DB: successfully set channel to', settings.channel);
          return settings;
        });
      }
    });
  },
  /**
   * Save admins to settings
   * @param {string[]} admins array of Slack user IDs for admins
   * @return {object} promise: new settings
   */
  async setAdmins(admins) {
    return Settings.findOne({}, (err, settings) => {
      if (err) return dbErrHandler(err);
      if (!admins || !admins.length) return new Error('No users provided');
      // No settings exist yet; save new settings document
      if (!settings) {
        const newSettings = new Settings({
          channel: process.env.SLACK_CHANNEL_ID,
          admins: admins
        });
        newSettings.save((err) => {
          if (err) return dbErrHandler(err);
          return newSettings;
        });
      } 
      // Update existing settings object
      else {
        settings.admins = admins;
        settings.save((err) => {
          if (err) return dbErrHandler(err);
          console.log('SETTINGS DB: successfully updated admin list to', settings.admins);
          return settings;
        });
      }
    });
  }
};

module.exports = settings;
