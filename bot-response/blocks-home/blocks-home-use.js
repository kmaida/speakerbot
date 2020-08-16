/*------------------
BLOCKS: APP HOME USE
------------------*/

const blocksHomeUse = () => {
  return [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": ":question: *How to Use:*\n\nI've provided *buttons* in this home view for you to do everything you might need:\n\n• listing new events,\n• listing new reports (in case you forgot to list the event before it happened),\n• adding reports to existing events,\n• editing upcoming events,\n• and editing completed reports.\n\nYou can also use *`/slash` commands* to open the appropriate forms to list events and submit reports.\n\nIn addition, you can use the *Speakerbot global shortcuts* from the :zap: lightning bolt menu at the left side of the input textarea in any channel or message."
      },
      "accessory": {
        "type": "image",
        "image_url": "https://i.imgur.com/KhiChDI.png?1",
        "alt_text": "Shortcuts"
      }
    },
    {
      "type": "divider"
    }
  ];
};

module.exports = blocksHomeUse;
