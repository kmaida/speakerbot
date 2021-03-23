const store = require('./../../data/settings-db');
const slackErr = require('./../../utils/error-slack');

/*------------------
PUBLISH SLACK REPORT
------------------*/

const publishSlackReport = async (app, data, savedObj, edit) => {
  // Post event to designated channel
  const settings = await store.getSettings();
  const channel = settings.channel;
  try {
    const publishSlackReport = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channel,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": edit ? `:writing_hand: *Existing Report Updated* :pencil:` : `:microphone: *Post-Event Report Added* :newspaper:`
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*From:* \`<@${data.submitterID}>\`\n*Event Name:* ${data.event_name}\n*Event URL:* <${data.url}>\n*Event Date:* ${data.event_date}\n*Speaker(s):* ${data.speakers}\n*Type of Event:* ${data.event_type}\n*Talk Topic:* ${data.topic}\n*Estimated Reach:* ${data.reach}\n*Content Links:* ${data.content_links}\n*Event Rating:* ${data.rating}/4\n*Report:* ${data.report}`
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
      ],
      unfurl_links: false,
      unfurl_media: false
    });
  }
  catch (err) {
    slackErr(app, channel, err);
  }
}

module.exports = publishSlackReport;
