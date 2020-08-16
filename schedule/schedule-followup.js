const setTimeout = require('safe-timers').setTimeout;
const dmFollowup = require('../bot-response/dm/dm-event-followup');
const channelFollowup = require('../bot-response/publish/publish-channel-followup');

/*------------------
  SCHEDULE FOLLOWUP
------------------*/

let timeouts = {};

const schedule = {
  /**
   * Set up followup by forming a followup object
   * Passing object to schedule.followup()
   * @param {App} app Slack App
   * @param {object} record Airtable record object
   * @return {object} scheduled event object
   */
  setupFollowup(app, record) {
    // Build followup object with necessary data to schedule followup
    const followuptime = new Date(record.fields['Followup'] + 'T00:00:00Z').getTime();
    const hourDelay = (1000 * 60 * 60) * 17.5;  // 12:30/1:30 Eastern (depending on DST)
    const followupAt = followuptime + hourDelay;
    const now = new Date().getTime();
    // If followup time has not passed
    if (now < followupAt) {
      const eventObj = {
        id: record.getId(),
        event_name: record.fields['Name'],
        event_date: record.fields['Date'],
        datetime: new Date(record.fields['Date'] + 'T00:00:00Z').getTime(),
        followup_at: followupAt,
        event_type: record.fields['Event Type'],
        topic: record.fields['Topic'],
        speakers: record.fields["Who's speaking?"],
        url: record.fields['Event URL'],
        submitterID: record.fields['Submitter Slack ID']
      };
      // Schedule the followup
      schedule.followup(app, eventObj);
      // Return the reformatted event object
      return eventObj;
    }
  },
  /**
   * Clear a specific scheduled followup timeout
   * @param {string} timeoutKey timeout to clear
   */
  clear(timeoutKey) {
    if (timeoutKey in timeouts) {
      clearTimeout(timeouts[timeoutKey]);
      delete timeouts[timeoutKey];
      console.log('SCHEDULE: followup was cleared for', timeoutKey);
    }
  },
  /**
   * Schedule a followup timeout
   * Clear any previously scheduled timeouts for this event
   * Set up new followup
   * @param {App} app Slack App
   * @param {object} recordObj event data object
   */
  followup(app, recordObj) {
    const timeoutKey = recordObj.id;
    // Clear previously scheduled timeout, if one exists
    schedule.clear(timeoutKey);
    // Set new followup
    const now = new Date().getTime();
    const timeout = recordObj.followup_at - now;
    timeoutCb = () => {
      dmFollowup(app, recordObj);
      channelFollowup(app, recordObj);
      schedule.clear(timeoutKey);
    }
    timeouts[timeoutKey] = setTimeout(timeoutCb, timeout);
    // Logging
    const logDays = Math.round(((timeout / (1000 * 60 * 60) / 24) + 0.00001) * 100) / 100;
    console.log(`SCHEDULE: new followup for ${recordObj.event_name} with ${recordObj.submitterID} (${timeoutKey}) in ${logDays} days: ${new Date(recordObj.followup_at)}`);
  }
};

module.exports = schedule;
