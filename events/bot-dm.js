const utils = require('./../utils/utils');

/*------------------
       BOT DM
------------------*/

const botDM = (app) => {
  app.event('message', utils.ignoreMention, async ({ event, context }) => {
    try {
      const sendMsg = await app.client.chat.postMessage({
        token: context.botToken,
        channel: event.channel,
        text: `:shrug: I'm sorry, I didn't understand that. Please go to my :house: *<slack://app?team=${process.env.SLACK_TEAM_ID}&id=${process.env.SLACK_APP_ID}&tab=home|Home tab>* to find out how I work, add upcoming speaking events, submit post-event reports, or edit any of your existing events!`
      });
    }
    catch (err) {
      console.error(err);
    }
  });
};

module.exports = botDM;
