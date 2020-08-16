const errSlack = require('./../utils/error-slack');
const utils = require('../utils/utils');

/*------------------
    APP MENTION
------------------*/

const appMention = (app) => {
  app.event('app_mention', utils.ignoreMention, async ({ event, context }) => {
    try {
      const result = await app.client.chat.postMessage({
        token: context.botToken,
        channel: event.channel,
        text: `:wave: Thanks for reaching out! Please go to my :house: *<slack://app?team=${process.env.SLACK_TEAM_ID}&id=${process.env.SLACK_APP_ID}&tab=home|App Home tab>* to find out how I work, add upcoming speaking events, submit post-event reports, or edit any of your existing events!`
      });
    }
    catch (err) {
      errSlack(app, event.channel, err);
    }
  });
};

module.exports = appMention;
