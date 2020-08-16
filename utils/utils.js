/*------------------
       UTILS
------------------*/

const utils = {
  regex: {
    // URL regex - https://regexr.com/4va24
    url: /((?:[A-Za-z]{3,9})(?::\/\/|@)(?:(?:[A-Za-z0-9\-.]+[.:])|(?:www\.|[-;:&=+$,\w]+@))(?:[A-Za-z0-9.-]+)(?:[/\-+=&;%@.\w_~()]*)(?:[.!/\\\w-?%#~&=+()]*))/g,
    // Reach (number)
    number: /^[0-9]*$/g
  },
  /**
   * Is the date today + future, or today + past?
   * @param {string} dateInput simple ISO date (YYYY-MM-DD)
   * @param {boolean} testFuture testing if date is in future (true)
   * @param {boolean} futureStartTomorrow testing if future should start tomorrow and not include today
   * @return {boolean} true if future, false if past
   */
  dateCompare(dateInput, testFuture, futureStartTomorrow) {
    // Get today's date in ISO at 11:59:59
    const now = new Date().toISOString().split('T')[0];
    const todayISO = now + 'T23:59:59Z';
    const today = new Date(todayISO);
    // Get event date in ISO at 11:59:59
    const eventDate = new Date(dateInput + 'T23:59:59Z');
    // Compare timestamps for UTC event date and UTC today to determine past/future
    // (Today is valid for past and valid for future if !futureStartTomorrow)
    const isFuture = !futureStartTomorrow ? eventDate.getTime() >= today.getTime() : eventDate.getTime() > today.getTime();
    const isPast = eventDate.getTime() <= today.getTime();
    // Are we checking for a future date or a past date?
    if (testFuture) {
      return isFuture;
    } else {
      return isPast;
    }
  },
  /**
   * Check input for URL validity via regex
   * @param {string} input URL form field input
   * @return {boolean} is the input a valid URL?
   */
  validUrl(input) {
    const regex = new RegExp(utils.regex.url);
    const cleanStr = input.toString().trim();
    return cleanStr.match(regex);
  },
  /**
   * Is the text field input a string that only contains numbers?
   * (We will coerce it later if it passes this validation)
   * @param {string} input reach form field input
   * @return {boolean} is the input a number?
   */
  isNumberFormat(input) {
    const regex = new RegExp(utils.regex.number);
    const cleanStr = input.toString().trim();
    return cleanStr.match(regex);
  },
  /**
   * Does the object have properties?
   * @param {object} obj object to test for properties
   * @return {boolean} return true if object is not empty
   */
  objNotEmpty(obj) {
    return Object.keys(obj).length && obj.constructor === Object;
  },
  /**
   * Takes event date and returns ISO string of next day
   * @param {string} dateStr Simple ISO date string (YYYY-MM-DD)
   * @return {string} ISO date string
   */
  getFollowupISO(dateStr) {
    const jsDate = new Date(dateStr);
    const jsDatetime = jsDate.getTime();
    const dayms = (1000 * 60 * 60) * 24;
    const nextDayDatetime = jsDatetime + dayms;
    const jsNextDay = new Date(nextDayDatetime);
    return jsNextDay.toISOString();
  },
  /**
   * Takes a JS date string and returns simple ISO string
   * @param {Date} dateInput JS date
   * @param {number} dayOffset number of days to offset by
   * @return {string} ISO date string
   */
  dateToISO(dateInput, dayOffset) {
    const msOffset = dayOffset ? dayOffset * (1000 * 60 * 60 * 24) : 0;
    const baseDate = typeof dateInput.getMonth === 'function' ? dateInput : new Date(dateInput);
    const dateObj = new Date(baseDate.getTime() + msOffset);
    const iso = dateObj.toISOString().split('T')[0];
    return iso;
  },
  /**
   * Sort user's events into upcoming and reports;
   * This does not display events that have passed and need reports;
   * That is handled separately
   * @param {object[]} allEvents array of event objects
   * @return {object} events sorted into upcoming and reports
   */
  sortUserEvents(allEvents) {
    const sortedEvents = {
      upcoming: [],
      reports: []
    };
    allEvents.forEach((event) => {
      // Future starts tomorrow
      const isFuture = utils.dateCompare(event.event_date, true, true);
      // Past includes today
      const isPast = utils.dateCompare(event.event_date);
      const hasRating = !!event.rating === true;
      const isUpcoming = isFuture && !hasRating;
      const isReport = isPast && hasRating;
      if (isUpcoming) {
        sortedEvents.upcoming.push(event);
      }
      else if (isReport) {
        sortedEvents.reports.push(event);
      }
    });
    return sortedEvents;
  },
  /**
   * Replace strings of nothing but a newline with undefined
   * @param {string} input text string
   * @return {string} fixed input
   */
  clearNewline(input) {
    if (input === '\n') {
      return undefined;
    } else {
      return input;
    }
  },
  /**
   * Message middleware: ignore some kinds of messages
   * A bit hacky to catch inconsistencies in Slack API
   * (Customer service was contacted; unreliable behavior confirmed)
   * @param {object} event event object
   * @return {Promise<void>} continue if not ignored message type
   */
  async ignoreMention({ message, event, next }) {
    const disallowedSubtypes = ['channel_topic', 'message_changed'];
    const ignoreSubtypeEvent = disallowedSubtypes.indexOf(event.subtype) > -1;
    const ignoreSubtypeMessage = message && message.subtype && disallowedSubtypes.indexOf(message.subtype) > -1;
    const ignoreEdited = !!event.edited;
    // If mention should be ignored, return
    if (ignoreSubtypeEvent || ignoreSubtypeMessage || ignoreEdited) {
      return;
    }
    // If mention should be processed, continue
    await next();
  }
};

module.exports = utils;
