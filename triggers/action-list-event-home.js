const blocksListEvent = require('./../bot-response/blocks-list-event');

/*------------------
 ACTION: LIST EVENT
 Add new event listing
 from App Home
------------------*/

module.exports = (app, store, errSlack) => {
  app.action('btn_list_event', async ({ ack, body, context }) => {
    await ack();
    // Create home parameters object
    const settings = await store.getSettings();
    const localHomeParams = {
      userID: body.user.id,
      viewID: body.view.id,
      botID: context.botUserId,
      channel: settings.channel,
      admins: settings.admins
    };
    // Open list event form
    try {
      const result = await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          callback_id: 'list_event',
          title: {
            type: 'plain_text',
            text: 'List Your Speaking Event'
          },
          blocks: blocksListEvent(),
          private_metadata: JSON.stringify(localHomeParams),
          submit: {
            type: 'plain_text',
            text: 'Save Event'
          }
        }
      });
    }
    catch (err) {
      errSlack(app, localHomeParams.userID, err);
    }
  });
};
