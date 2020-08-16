const slackErr = require('./../../utils/error-slack');

/*------------------
 DM SNOOZE FOLLOWUP
------------------*/

module.exports = async (app, recordObj) => {
  // Notify user they snoozed their post-event report followup
  try {
    const confirmDM = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: recordObj.submitterID,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `:alarm_clock: *You snoozed your event report follow-up for ${recordObj.event_name}.*\nI'll remind you again on ${recordObj.followup}!`
          }
        }
      ]
    });
  }
  catch (err) {
    slackErr(app, recordObj.submitterID, err);
  }
}
