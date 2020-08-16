/*------------------
   FORM: SPEAKERS
------------------*/

module.exports = (aid, placeholder, initial) => {
  return {
    "type": "input",
    "block_id": "speakers",
    "element": {
      "type": "plain_text_input",
      "action_id": aid,
      "placeholder": {
        "type": "plain_text",
        "text": placeholder
      },
      "initial_value": initial
    },
    "label": {
      "type": "plain_text",
      "text": "Speaker(s):"
    },
    "hint": {
      "type": "plain_text",
      "text": "If you have co-speakers for your session(s), please list all names."
    }
  };
}
