const blocksSnoozeFollowup = require('./../bot-response/blocks-snooze-followup');
const errSlack = require('./../utils/error-slack');

/*------------------
ACTION: SNOOZE FOLLOWUP
------------------*/

module.exports = (app) => {
  app.action('btn_snooze_followup', async ({ ack, body }) => {
    await ack();
    // Event data passed in from button
    const eventData = JSON.parse(body.actions[0].value);
    // Original event data to pass through to Airtable
    const atData = {
      id: eventData.id,
      submitterID: eventData.submitterID
    };
    // Open snooze followup modal
    try {
      const result = await app.client.views.open({
        token: process.env.SLACK_BOT_TOKEN,
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          callback_id: 'snooze_followup',
          title: {
            type: 'plain_text',
            text: 'Snooze Event Report'
          },
          blocks: blocksSnoozeFollowup(eventData),
          private_metadata: JSON.stringify(atData),
          submit: {
            type: 'plain_text',
            text: 'Snooze Reminder'
          }
        }
      });
    }
    catch (err) {
      errSlack(app, body.user.id, err);
    }
  });
};

