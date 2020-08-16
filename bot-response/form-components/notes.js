/*------------------
     FORM: NOTES
------------------*/

module.exports = (aid, initial) => {
  return {
    "type": "input",
    "block_id": "notes",
    "element": {
      "type": "plain_text_input",
      "action_id": aid,
      "multiline": true,
      "placeholder": {
        "type": "plain_text",
        "text": "Special information or additional details"
      },
      "initial_value": initial
    },
    "label": {
      "type": "plain_text",
      "text": "Notes:"
    },
    "optional": true,
    "hint": {
      "type": "plain_text",
      "text": "Please provide any additional information you'd like to share about this event. How can we help support you? What should we keep in mind when promoting?"
    }
  };
};
