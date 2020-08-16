const btnEventReport = require('./../../bot-response/ix-components/btn-event-report');

/*------------------
BLOCKS: APP HOME REPORT
------------------*/

const blocksHomeNeedsReport = (recordObjArr, homeParams) => {
  if (recordObjArr.length) {
    const aboutReportsBlocks = [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": ":pencil: *Add Post-Event Reports for Completed Events:*"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "According to my records, you have reports you can fill out for events that may have occurred today or in the past.\n\nI can help with that. Just click the button next to any event listed here, and I'll help you fill out your report."
        }
      }
    ];
    const eventsListBlocks = [];
    recordObjArr.forEach((recordObj) => {
      const thisEventBlock = {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `• *${recordObj.event_name}*: ${recordObj.event_type} (${recordObj.event_date})`
        },
        "accessory": btnEventReport(recordObj, homeParams)
      };
      eventsListBlocks.push(thisEventBlock);
    });
    const footerBlocks = [
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": `:writing_hand: I've included everything I know in the reports so far. Please make sure the info in the form is correct, then fill in the remaining fields.`
          }
        ]
      },
      {
        "type": "divider"
      }
    ];
    // Return compiled blocks
    return aboutReportsBlocks.concat(eventsListBlocks).concat(footerBlocks);
  }
  return [];
};

module.exports = blocksHomeNeedsReport;
