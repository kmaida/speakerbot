/*------------------
  FORM: EVENT DATE
------------------*/

module.exports = (aid, placeholder, hint, initial) => {
  return {
    "type": "input",
    "block_id": "event_date",
    "element": {
      "type": "datepicker",
      "action_id": aid,
      "placeholder": {
        "type": "plain_text",
        "text": placeholder
      },
      "initial_date": initial
    },
    "label": {
      "type": "plain_text",
      "text": "Event Date:"
    },
    "hint": {
      "type": "plain_text",
      "text": hint
    }
  }
};
