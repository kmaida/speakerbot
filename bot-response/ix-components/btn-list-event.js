/*------------------
BUTTON: LIST NEW EVENT
------------------*/

const btnListEvent = (homeParams) => {
  return {
    "type": "button",
    "text": {
      "type": "plain_text",
      "text": "List New Upcoming Event"
    },
    "action_id": "btn_list_event",
    "value": JSON.stringify(homeParams),
    "style": "primary"
  };
}

module.exports = btnListEvent;
