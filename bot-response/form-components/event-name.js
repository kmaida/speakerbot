/*------------------
  FORM: EVENT NAME
------------------*/

module.exports = (aid, initial) => {
  return {
    "type": "input",
    "block_id": "event_name",
    "element": {
      "type": "plain_text_input",
      "action_id": aid,
      "placeholder": {
        "type": "plain_text",
        "text": "CoolConf 2020"
      },
      "initial_value": initial
    },
    "label": {
      "type": "plain_text",
      "text": "Event Name:"
    },
    "hint": {
      "type": "plain_text",
      "text": "If the event takes place regularly and/or in multiple locations, please include details (e.g., CoolConf Los Angeles 2020)."
    }
  }
};
