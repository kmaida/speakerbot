const btnListEvent = require('../ix-components/btn-list-event');
const btnNewReport = require('../ix-components/btn-new-report');

/*------------------
BLOCKS: APP HOME DETAILS
------------------*/

const blocksHomeDetails = (homeParams) => {
  return [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `:sparkles: *List New Speaking Events:*\n\nI ask that you tell me about your upcoming speaking events. Why?`
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `_Support for speakers._\n• We can offer you content and slide reviews, as well as rehearsal opportunities\n• Get speaking tips and/or professional speaker coaching\n• Get swag to give away at the event\n• Align on messaging / topic suggestions if you're looking for something to speak about\n• Get equipment or other physical resources (microphones, webcams, slide advancers, lights, adapters, etc.)`
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `_Larger promotion of your event presence._\n• We can share your upcoming event on various social media channels\n• We can highlight your upcoming event in newsletters, promotional materials, mention it at other (earlier) events, etc.\n• We can also share your event with the developer community and developer programs`
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Slash Command:* `/speaking-new`\n\n*Shortcut:* `List a speaking event`"
      }
    },
    {
      "type": "actions",
      "elements": [
        btnListEvent(homeParams)
      ]
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `:newspaper: *Post-Event Reports:*\n\nI ask that you fill out an Event Report after your speaking engagement has concluded. Why?`
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `_Greater promotion of your event presence._\n• We can share your event recording on various social media channels\n• We can highlight your event presence / recordings / broadcasts in newsletters, promotional materials, mention it at other (earlier) events, etc.\n• We can share your event with the developer community and developer programs`
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `_Measuring and learning from outcomes and results._\n• Was the event totally awesome / beyond expectations? Was it decent? Was it meh? Was it a waste of time?\n• Should we make sure that we try to participate every year?\n• Should we consider getting more deeply involved / offer sponsorship in the future?\n• How many people did you reach at the event?\n• Were there any really interesting outcomes? (New people you met, new companies you developed relationships with, new community contributors who we should invite to ambassador programs or advisory boards? People you converted to company products? People who had critical feedback on products?)`
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Slash Command:* `/speaking-report`\n\n*Shortcut:* `Submit event report`"
      }
    },
    {
      "type": "actions",
      "elements": [
        btnNewReport(homeParams)
      ]
    },
    {
      "type": "divider"
    }
  ];
};

module.exports = blocksHomeDetails;
