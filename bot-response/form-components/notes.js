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
        "text": "Please provide any additional information you'd like to share about this event. How can DevRel help support you?"
      },
      "initial_value": initial
    },
    "label": {
      "type": "plain_text",
      "text": "Notes:"
    },
    "optional": true
  };
};
