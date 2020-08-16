/*------------------
BLOCKS: APP HOME ADMIN
------------------*/

const blocksHomeAdmin = (homeParams) => {
  return [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": ":female-construction-worker: *Admin:*"
      }
    },
    {
      "type": "section",
      "block_id": "select_channel",
      "text": {
        "type": "mrkdwn",
        "text": `*Select the channel* <@${homeParams.botID}> should post to when event listings and event reports are submitted:`
      },
      "accessory": {
        "action_id": "a_select_channel",
        "type": "channels_select",
        "initial_channel": homeParams.channel,
        "placeholder": {
          "type": "plain_text",
          "text": "Select a channel"
        },
        "confirm": {
          "title": {
            "type": "plain_text",
            "text": "Confirm Channel Selection"
          },
          "text": {
            "type": "mrkdwn",
            "text": `Are you sure you want to update the channel that <@${homeParams.botID}> reports in? (Make sure you have added <@${homeParams.botID}> to the new channel!)`
          },
          "confirm": {
            "type": "plain_text",
            "text": "Yes"
          },
          "deny": {
            "type": "plain_text",
            "text": "Nevermind"
          }
        }
      }
    },
    {
      "type": "context",
      "elements": [
        {
          "type": "mrkdwn",
          "text": `*Important:* <@${homeParams.botID}> must be added to the channel you select.`
        }
      ]
    },
    {
      "type": "section",
      "block_id": "select_admins",
      "text": {
        "type": "mrkdwn",
        "text": `*Select users with admin privileges* to control <@${homeParams.botID}>:`
      },
      "accessory": {
        "action_id": "a_select_admins",
        "type": "multi_users_select",
        "placeholder": {
          "type": "plain_text",
          "text": "Select Admin Users"
        },
        "initial_users": homeParams.admins
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `*Sync events from Airtable*: if you make manual updates to events _in the <https://airtable.com/${process.env.AIRTABLE_TABLE_ID}/${process.env.AIRTABLE_VIEW_ID}|Airtable itself>_, you should sync Speakerbot with Airtable afterward. Airtable does not provide a webhook or Zapier integration to push record updates, so this has to be done manually if changes are made outside of the Slack app.`
      },
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "Sync All Events"
        },
        "action_id": "btn_sync_events"
      }
    },
    {
      "type": "context",
      "elements": [
        {
          "type": "mrkdwn",
          "text": `*Note:* Speakerbot syncs with Airtable every night, but if you want to see changes instantly after making Airtable updates, you'll need to sync manually.`
        }
      ]
    },
    {
      "type": "divider"
    }
  ];
};

module.exports = blocksHomeAdmin;
