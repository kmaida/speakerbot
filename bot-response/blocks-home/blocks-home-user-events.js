const btnEditEvent = require('../ix-components/btn-edit-event');
const btnEditReport = require('../ix-components/btn-edit-report');

/*------------------
 BLOCKS: USER EVENTS
------------------*/

const blocksUserEvents = (sortedEvents, homeParams) => {
  let upcomingEvents = [];
  const upcomingEventsListBlocks = [];
  let reports = [];
  const reportsListBlocks = [];
  const divider = {
    "type": "divider"
  };
  // If there are upcoming events, compose them into blocks
  if (sortedEvents.upcoming.length) {
    upcomingEvents = [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": ":spiral_calendar_pad: *Your Upcoming Events:*"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "You have events happening soon. If you need to make any changes to these upcoming event listings, you can do so below."
        }
      }
    ];
    sortedEvents.upcoming.forEach((eventObj) => {
      const thisEventBlock = {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `• *${eventObj.event_name}*: ${eventObj.event_type} (${eventObj.event_date})`
        },
        "accessory": btnEditEvent(eventObj, homeParams)
      };
      upcomingEventsListBlocks.push(thisEventBlock);
    });
    upcomingEventsListBlocks.push(divider);
  }
  // If there are completed event reports, compose them into blocks
  if (sortedEvents.reports.length) {
    reports = [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": ":newspaper: *Your Completed Post-Event Reports:*"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "You filled out the following post-event reports. If you need to make any changes, you can edit your reports here."
        }
      }
    ];
    sortedEvents.reports.forEach((eventObj) => {
      const thisEventBlock = {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `• *${eventObj.event_name}*: ${eventObj.event_type} (${eventObj.event_date})`
        },
        "accessory": btnEditReport(eventObj, homeParams)
      };
      reportsListBlocks.push(thisEventBlock);
    });
    reportsListBlocks.push(divider);
  }
  // Return compiled blocks
  return upcomingEvents.concat(upcomingEventsListBlocks).concat(reports).concat(reportsListBlocks);
};

module.exports = blocksUserEvents;
