const blocksListEvent = require('./../bot-response/blocks-list-event');

/*------------------
 ACTION: EDIT EVENT
 Edit upcoming event
 from App Home
------------------*/

module.exports = (app, store, errSlack) => {
  app.action('btn_edit_event', async ({ ack, body, context }) => {
    await ack();
    // If prefill info is available, set it
    const prefill = body.actions ? JSON.parse(body.actions[0].value) : {};
    // Create home parameters object
    const settings = await store.getSettings();
    const eventID = prefill ? prefill.id : undefined;
    const localHomeParams = {
      userID: body.user.id,
      viewID: body.view.id,
      botID: context.botUserId,
      channel: settings.channel,
      admins: settings.admins,
      eventID: eventID
    };
    // Open post event report form
    try {
      const result = await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          callback_id: 'list_event',
          title: {
            type: 'plain_text',
            text: 'Edit Event Listing'
          },
          blocks: blocksListEvent(prefill),
          private_metadata: JSON.stringify(localHomeParams),
          submit: {
            type: 'plain_text',
            text: 'Update Event'
          }
        }
      });
    }
    catch (err) {
      errSlack(app, localHomeParams.userID, err);
    }
  });
};
