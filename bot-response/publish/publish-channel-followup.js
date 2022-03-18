const store = require('./../../data/settings-db');
const slackErr = require('./../../utils/error-slack');

/*------------------
 NOTIFY OF FOLLOWUP
------------------*/

module.exports = async (app, recordObj) => {
  const settings = await store.getSettings();
  const channel = settings.channel;
  // Notify user they should fill out the post-event form if they haven't already
  try {
    if (!recordObj.event_rating) {
      const channelMsgFollowup = await app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: channel,
        text: `:tada: \`<@${recordObj.submitterID}>\` recently spoke at *${recordObj.event_name}* on ${recordObj.event_date}.\n:speech_balloon: I just sent them a reminder to fill out their post-event report.`
      });
    }
  }
  catch (err) {
    slackErr(app, channel, err);
  }
}
