/*------------------
BUTTON: SNOOZE FOLLOWUP
with data to pass through
------------------*/

const btnSnoozeFollowup = (eventData) => {
  return {
    "type": "button",
    "text": {
      "type": "plain_text",
      "text": "Snooze Reminder"
    },
    "action_id": "btn_snooze_followup",
    "value": JSON.stringify(eventData)
  };
}

module.exports = btnSnoozeFollowup;