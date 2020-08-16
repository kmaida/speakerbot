const errSlack = require('./../utils/error-slack');

/*------------------
SUBMIT SNOOZE FOLLOWUP
------------------*/

const submitSnooze = (app, at, utils) => {
  // Modal view submitted
  app.view('snooze_followup', async ({ ack, body, view }) => {
    const atData = JSON.parse(view.private_metadata);
    const payload = view.state.values;
    // Capture data from modal interactions
    const eventID = atData.id;
    const submitterID = body.user.id;
    const newFollowup = payload.snooze.a_snooze.selected_date;

    // Validate form fields and handle errors
    // https://api.slack.com/surfaces/modals/using#displaying_errors#displaying_errors
    let ackParams = {
      response_action: 'errors',
      errors: {}
    };
    if (!utils.dateCompare(newFollowup, true, true)) {
      ackParams.errors.snooze = 'This followup date is today or in the past. Please choose a date in the future.';
    }
    if (utils.objNotEmpty(ackParams.errors)) {
      await ack(ackParams);
      return;
    }
    await ack();

    // Save data to Airtable, reschedule followup, and confirm with user
    try {
      const saveFollowup = await at.snoozeFollowup(app, submitterID, eventID, newFollowup);
    }
    catch (err) {
      errSlack(app, submitterID, err);
    }
  });
};

module.exports = submitSnooze;
