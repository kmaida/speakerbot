/*------------------
BUTTON: EDIT EVENT
with initial values
------------------*/

const btnEditEvent = (eventObj, homeParams) => {
  if (homeParams) {
    eventObj.homeParams = homeParams;
  }
  return {
    "type": "button",
    "text": {
      "type": "plain_text",
      "text": "Edit Event Listing"
    },
    "action_id": "btn_edit_event",
    "value": JSON.stringify(eventObj)
  };
}

module.exports = btnEditEvent;
