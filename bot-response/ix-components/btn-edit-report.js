/*------------------
BUTTON: EDIT REPORT
with initial values
------------------*/

const btnEditReport = (eventObj, homeParams) => {
  if (homeParams) {
    eventObj.homeParams = homeParams;
  }
  return {
    "type": "button",
    "text": {
      "type": "plain_text",
      "text": "Edit Event Report"
    },
    "action_id": "btn_edit_report",
    "value": JSON.stringify(eventObj)
  };
}

module.exports = btnEditReport;
