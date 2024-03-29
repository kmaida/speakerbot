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
    const hourDelay = (1000 * 60 * 60) * 17;  // 12/1 Eastern (depending on DST)
    const followupAt = followuptime + hourDelay;
    // Uncomment below for testing followup feature
    // const followupAt = new Date().getTime() + 5000;
    const now = new Date().getTime();
    const eventObj = {
      id: record.getId(),
      event_name: record.fields['Name'],
      event_date: record.fields['Date'],
      datetime: new Date(record.fields['Date'] + 'T00:00:00Z').getTime(),
      event_type: record.fields['Event Type'],
      topic: record.fields['Topic'],
      speakers: record.fields["Who's speaking?"],
      url: record.fields['Event URL'],
      submitterID: record.fields['Submitter Slack ID']
    };
    // If followup time has not passed and there is no report completed
    if (now < followupAt && !record.fields['Event Rating']) {
      // Add followup to event object
      eventObj.followup_at = followupAt;
      // Schedule followup
      schedule.followup(app, eventObj);
    }
    // Return the reformatted event object
    return eventObj;
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
      // If there is no event rating and there is a followup time, send the followup
      if (!!recordObj.event_rating === false && !!recordObj.followup_at) {
        dmFollowup(app, recordObj);
        channelFollowup(app, recordObj);
      }
      schedule.clear(timeoutKey);
    }
    timeouts[timeoutKey] = setTimeout(timeoutCb, timeout);
    // Logging
    const logDays = Math.round(((timeout / (1000 * 60 * 60) / 24) + 0.00001) * 100) / 100;
    console.log(`SCHEDULE: new followup for ${recordObj.event_name} with ${recordObj.submitterID} (${timeoutKey}) in ${logDays} days: ${new Date(recordObj.followup_at)}`);
  }
};

module.exports = schedule;
