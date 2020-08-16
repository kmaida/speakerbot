const jobs = require('./../schedule/jobs');

/*------------------
 ACTION: SYNC EVENTS
 Manual changes in Airtable
 Reschedule all events
 Update all home views
------------------*/

module.exports = (app, at, store) => {
  app.action('btn_sync_events', async ({ ack, body }) => {
    await ack();
    jobs.syncAllEvents(app, at, store, body.user.id);
  });
};
