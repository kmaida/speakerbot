/*------------------
BUTTON: EVENT REPORT
with initial values
------------------*/

const btnEventReport = (recordObj, homeParams) => {
  const aid = !!homeParams ? "btn_event_report_home" : "btn_event_report";
  if (homeParams) {
    recordObj.homeParams = homeParams;
  }
  return {
    "type": "button",
    "text": {
      "type": "plain_text",
      "text": "Add Event Report"
    },
    "action_id": aid,
    "value": JSON.stringify(recordObj),
    "style": "primary"
  };
}

module.exports = btnEventReport;
