const btnEventReport = require('./../ix-components/btn-event-report');
const btnSnoozeFollowup = require('./../ix-components/btn-snooze-followup');
const slackErr = require('./../../utils/error-slack');

/*------------------
 DM EVENT FOLLOWUP
------------------*/

module.exports = async (app, recordObj) => {
  // Notify user they should fill out the post-event form (if they haven't already filled one out)
  try {
    if (!!recordObj?.event_rating === false) {
      const confirmDM = await app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: recordObj.submitterID,
        blocks: [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `:card_file_box: Hello! According to my records, *you recently spoke at ${recordObj.event_name} (${recordObj.event_date})*.\n:postbox: Please *complete an Event Report* to share how it went. This information is incredibly valuable — thank you for your contributions! :tada:`
            },
            "block_id": "dm_followup_report",
            "accessory": btnEventReport(recordObj)
          },
          {
            "type": "context",
            "elements": [
              {
                "type": "mrkdwn",
                "text": ":information_desk_person: I've prefilled the form with information I already know. Please make sure it's correct, then fill in the remaining fields."
              }
            ]
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `:zzz: Not ready to fill out your event report yet? Snooze this reminder and I'll follow up again when it's more convenient for you!`
            },
            "block_id": "dm_date_snooze_followup",
            "accessory": btnSnoozeFollowup(recordObj)
          },
        ]
      });
    }
  }
  catch (err) {
    slackErr(app, recordObj.submitterID, err);
  }
}
