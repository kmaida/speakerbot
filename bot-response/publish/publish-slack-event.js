const store = require('./../../data/settings-db');
const slackErr = require('./../../utils/error-slack');

/*------------------
PUBLISH SLACK EVENT
------------------*/

const publishSlackEvent = async (app, data, savedObj, edit) => {
  // Post event to designated channel
  const settings = await store.getSettings();
  const channel = settings.channel;
  try {
    const publishSlackEvent = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channel,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": edit ? `:writing_hand: *Existing Event Updated* :pencil:` : `:microphone: *New Event Added* :sparkles:`
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*From:* \`<@${data.submitterID}>\`\n*Event Name:* ${data.event_name}\n*Event URL:* <${data.url}>\n*Event Location:* ${data.location}\n*Event Date:* ${data.event_date}\n*Type of Event:* ${data.event_type}\n*Speaker(s):* ${data.speakers}\n*Talk Topic:* ${data.topic}\n*Notes:* ${data.notes}`
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": `:link: <${savedObj.link}|View in Airtable>`
            }
          ]
        }
      ]
    });
  }
  catch (err) {
    slackErr(app, channel, err);
  }
}

module.exports = publishSlackEvent;
