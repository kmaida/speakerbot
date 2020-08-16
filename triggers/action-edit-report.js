/*------------------
 ACTION: EDIT REPORT
 Modify existing report
 from App Home
------------------*/

module.exports = (app, store, blocksEventReport, errSlack) => {
  app.action('btn_edit_report', async ({ ack, body, context }) => {
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
      eventID: eventID,
      editReport: true
    };
    // Open post event report form
    try {
      const result = await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          callback_id: 'event_report',
          title: {
            type: 'plain_text',
            text: 'Edit Post Event Report'
          },
          blocks: blocksEventReport(prefill),
          private_metadata: JSON.stringify(localHomeParams),
          submit: {
            type: 'plain_text',
            text: 'Update Report'
          }
        }
      });
    }
    catch (err) {
      errSlack(app, localHomeParams.userID, err);
    }
  });
};
