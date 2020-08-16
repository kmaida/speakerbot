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
      "placeholder": {
        "type": "plain_text",
        "text": placeholder
      },
      "initial_value": initial
    },
    "label": {
      "type": "plain_text",
      "text": "Topic:"
    }
  };
}
