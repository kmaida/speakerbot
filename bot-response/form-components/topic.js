/*------------------
    FORM: TOPIC
------------------*/

module.exports = (aid, placeholder, initial) => {
  return  {
    "type": "input",
    "block_id": "topic",
    "element": {
      "type": "plain_text_input",
      "action_id": aid,
      "multiline": true,
      "placeholder": {
        "type": "plain_text",
        "text": placeholder
      },
      "initial_value": initial
    },
    "label": {
      "type": "plain_text",
      "text": "Topic:"
    },
    "hint": {
      "type": "plain_text",
      "text": "Please provide your talk/workshop title and abstract or agenda."
    }
  };
}
