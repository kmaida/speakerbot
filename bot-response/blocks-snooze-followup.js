/*------------------
BLOCKS: SNOOZE FOLLOWUP
------------------*/

const blocksSnoozeFollowup = (recordObj) => {
  return [
    {
      "type": "input",
      "block_id": "snooze",
      "element": {
        "type": "datepicker",
        "action_id": "a_snooze",
        "placeholder": {
          "type": "plain_text",
          "text": "Snooze until..."
        }
      },
      "label": {
        "type": "plain_text",
        "text": "Remind Me On:"
      },
      "hint": {
        "type": "plain_text",
        "text": `Select the date you'd like to be reminded to fill out the event report for ${recordObj.event_name}.`
      }
    }
  ]
};

module.exports = blocksSnoozeFollowup;
