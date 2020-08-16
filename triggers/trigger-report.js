const blocksEventReport = require('../bot-response/blocks-event-report');
const errSlack = require('./../utils/error-slack');

/*------------------
 Event Report
 Command & Shortcut
------------------*/

const triggerSpeakingReport = (app) => {
  const openReportModal = async ({ ack, body, context }) => {
    const userID = body.user_id || body.user.id;
    await ack();
    // If prefill info is available, set it
    const prefill = body.actions ? JSON.parse(body.actions[0].value) : {};
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
            text: 'Post Event Report'
          },
          blocks: blocksEventReport(prefill),
          submit: {
            type: 'plain_text',
            text: 'Submit Report'
          }
        }
      });
    }
    catch (err) {
      errSlack(app, userID, err);
    }
  };
  // Command /speaking-report
  app.command('/speaking-report', openReportModal);
  // Global shortcut Submit event report
  app.shortcut('event_report', openReportModal);
  // Button click from scheduled followup
  // (Button clicks from app home: app-home-opened.js)
  app.action('btn_event_report', openReportModal);
};

module.exports = triggerSpeakingReport;
