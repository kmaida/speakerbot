const errSlack = require('./../utils/error-slack');

/*------------------
   SUBMIT REPORT
------------------*/

const submitReport = (app, at, utils) => {
  // Modal view submitted
  app.view('event_report', async ({ ack, body, view, context }) => {
    const bc = {
      userID: body.user.id,
      userMention: `<@${body.user.id}>`,
      botToken: context.botToken
    };
    const homeParams = view.private_metadata ? JSON.parse(view.private_metadata) : {};
    const payload = view.state.values;
    const data = {
      submitterID: bc.userID,
      event_name: payload.event_name.r_event_name.value,
      speakers: payload.speakers.r_speakers.value,
      event_date: payload.event_date.r_event_date.selected_date,
      event_type: payload.event_type.r_event_type.selected_option.value,
      url: payload.url.r_url.value,
      topic: payload.topic.r_topic.value,
      reach: payload.reach.r_reach.value * 1,
      content_links: payload.content_links.r_content_links.value || '',
      rating: payload.rating.r_rating.selected_option.value,
      report: payload.event_report.r_report.value
    };
    // Validate form fields and handle errors
    // https://api.slack.com/surfaces/modals/using#displaying_errors#displaying_errors
    let ackParams = { 
      response_action: 'errors',
      errors: {}
    };
    if (!utils.dateCompare(data.event_date, false)) {
      ackParams.errors.event_date = 'This event is in the future. Please use "/speaking-new" to list an upcoming event.';
    }
    if (!utils.validUrl(data.url.toString())) {
      ackParams.errors.url = 'Please provide a valid URL.';
    }
    if (!utils.isNumberFormat(payload.reach.r_reach.value)) {
      ackParams.errors.reach = 'Only numbers are allowed in this field for metrics reasons. If you\'d like to add more context, use the "Report" field below.'
    }
    if (utils.objNotEmpty(ackParams.errors)) {
      await ack(ackParams);
      return;
    }
    await ack();

    // Save data to Airtable and output results in Slack channel
    try {
      const saveToAirtable = await at.submitEventReport(app, bc, data, homeParams);
    }
    catch (err) {
      errSlack(app, bc.userID, err);
    }
  });
};

module.exports = submitReport;
