const store = require('./../../data/settings-db');
const slackErr = require('./../../utils/error-slack');

/*------------------
  PUBLISH WEEKLY
------------------*/

const publishWeekly = async (app, eventsArr) => {
  // Post event to designated channel
  const settings = await store.getSettings();
  const channel = settings.channel;
  const eventsText = eventsArr.length ? eventsArr.join('\n') : `_There are no events scheduled this week yet._`;
  try {
    const publishSlackRoundup = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channel,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `:loudspeaker: *Upcoming Events This Week* :spiral_calendar_pad:`
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": eventsText
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": `:spiral_note_pad: New events may be added to this week after this announcement, so keep an eye out!`
            }
          ]
        }
      ],
      unfurl_links: false,
      unfurl_media: false
    });
  }
  catch (err) {
    slackErr(app, channel, err);
  }
}

module.exports = publishWeekly;
