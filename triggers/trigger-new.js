const blocksListEvent = require('../bot-response/blocks-list-event');
const errSlack = require('./../utils/error-slack');

/*------------------
 List Event
 Command & Shortcut
------------------*/

const triggerSpeakingNew = (app) => {
  const openNewModal = async ({ ack, body, context }) => {
    const userID = body.user_id || body.user.id;
    await ack();
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
          submit: {
            type: 'plain_text',
            text: 'Save Event'
          }
        }
      });
    }
    catch (err) {
      errSlack(app, userID, err);
    }
  };
  // Command /speaking-new
  app.command('/speaking-new', openNewModal);
  // Global shortcut List a speaking event
  app.shortcut('list_event', openNewModal);
};

module.exports = triggerSpeakingNew;
