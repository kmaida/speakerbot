/*------------------
BUTTON: NEW REPORT
------------------*/

const btnNewReport = (homeParams) => {
  return {
    "type": "button",
    "text": {
      "type": "plain_text",
      "text": "Add New Event Report"
    },
    "action_id": "btn_new_report",
    "value": JSON.stringify(homeParams),
    "style": "primary"
  };
}

module.exports = btnNewReport;
