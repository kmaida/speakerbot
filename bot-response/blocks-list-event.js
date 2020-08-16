const eventName = require('./form-components/event-name');
const eventDate = require('./form-components/event-date');
const eventType = require('./form-components/event-type');
const eventUrl = require('./form-components/event-url');
const eventLocation = require('./form-components/event-location');
const speakers = require('./form-components/speakers');
const topic = require('./form-components/topic');
const notes = require('./form-components/notes');

/*------------------
 BLOCKS: LIST EVENT
------------------*/

const blocksListEvent = (prefill = {}) => {
  return [
    eventName('a_event_name', prefill.event_name),
    eventDate('a_event_date', 'When will you speak?', 'If this is a multi-day event, enter the date you\'ll be speaking. If you\'re speaking multiple days, enter the first date.', prefill.event_date),
    eventLocation('a_location', prefill.location),
    eventUrl('a_url', prefill.url),
    speakers('a_speakers', 'Who is speaking at this event?', prefill.speakers),
    eventType('a_event_type', prefill.event_type),
    topic('a_topic', 'What will you speak about?', prefill.topic),
    notes('a_notes', prefill.notes)
  ]
};

module.exports = blocksListEvent;
