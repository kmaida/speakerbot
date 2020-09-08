const cron = require('cron');
const utils = require('./../utils/utils');
const userHomeStore = require('./../data/userhome-db');
const triggerHomeViewUpdate = require('./../triggers/trigger-home-view-update');
const dmSyncEvents = require('./../bot-response/dm/dm-sync-events');
const errSlack = require('./../utils/error-slack');

/*------------------
     CRON JOBS
------------------*/

const jobs = {
  /**
   * Get and share all events upcoming this week
   * @param {App} app Slack App
   * @param {module} at Airtable module
   */
  eventsThisWeek(app, at) {
    const weeklyRoundup = async () => {
      const today = new Date();
      // We'll get dates BEFORE this date in Airtable filter formula, so it should be the following Monday
      const endOfWeekISO = utils.dateToISO(today, 7);
      const roundup = await at.getEventsThisWeek(endOfWeekISO, app);
    };
    const job = new cron.CronJob({
      cronTime: '15 12 * * MON',
      onTick: weeklyRoundup,
      timeZone: 'America/Detroit'
    });
    // Log next 3 scheduled dates
    console.log('JOBS: next 3 weekly roundups scheduled for', job.nextDates(3).map(date => date.toString()));
    job.start();
  },
  /**
   * Reschedule events / update home views
   * @param {App} app Slack App
   * @param {module} at Airtable module
   * @param {module} store MongoDB module
   * @param {string} userID Slack user ID of admin
   */
  async syncAllEvents(app, at, store, userID) {
    // Get app settings
    const settings = await store.getSettings();
    // Re-schedule all event followups
    // (Scheduling followups clears any previous)
    at.getFollowupEvents(app);
    // Update app home view for all users who have opened app home
    try {
      const allUserHomes = await userHomeStore.getUserHomes();
      allUserHomes.forEach(async (userHome) => {
        const userHomeParams = {
          userID: userHome.userID,
          viewID: userHome.viewID,
          botID: process.env.SLACK_BOT_USER_ID,
          channel: settings.channel,
          admins: settings.admins
        };
        await triggerHomeViewUpdate(app, userHomeParams, at);
      });
    }
    catch (err) {
      // If admin-initiated, send errors in DM
      if (userID) {
        errSlack(app, userID, err);
      } else {
        console.error(err);
      }
    }
    // If admin-initiated, confirm events synced with admin user in DM
    if (userID) dmSyncEvents(app, userID, errSlack);
  },
  /**
   * Sync all events with Airtable every 12 hours
   * @param {App} app Slack App
   * @param {module} at Airtable module
   * @param {module} store MongoDB module
   */
  setupEventSyncs(app, at, store) {
    const job = new cron.CronJob({
      cronTime: '0 0/12 * * *',
      onTick: jobs.syncAllEvents(app, at, store),
      timeZone: 'America/Detroit'
    });
    // Log next 3 scheduled dates
    console.log('JOBS: next 3 event syncs scheduled for', job.nextDates(3).map(date => date.toString()));
    job.start();
  }
};

module.exports = jobs;
