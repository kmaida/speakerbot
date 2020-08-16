const slackErr = require('./../../utils/error-slack');

/*------------------
  DM SNOOZE ERROR
------------------*/

module.exports = async (app, submitterID) => {
  // Notify user they snoozed their post-event report followup
  // This shouldn't ever happen, but just in case it does:
  try {
    const sendErrorDM = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: submitterID,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `:white_check_mark: I couldn't snooze your report reminder because you've *already completed a report for that event*. Thank you! :tada:`
          }
        }
      ]
    });
  }
  catch (err) {
    slackErr(app, recordObj.submitterID, err);
  }
}
