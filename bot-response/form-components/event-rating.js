/*------------------
 FORM: EVENT RATING
------------------*/

module.exports = (aid, initial) => {
  const optionText = [
    ':disappointed: Poor',
    ':neutral_face: Okay',
    ':simple_smile: Good',
    ':star-struck: Great!'
  ];
  const initialOption = initial ? {
    "text": {
      "type": "plain_text",
      "text": optionText[(initial * 1) - 1]
    },
    "value": initial
  } : undefined;

  return {
    "type": "input",
    "block_id": "rating",
    "element": {
      "action_id": aid,
      "type": "static_select",
      "placeholder": {
        "type": "plain_text",
        "text": "How was this event?"
      },
      "initial_option": initialOption,
      "options": [
        {
          "text": {
            "type": "plain_text",
            "text": ":star-struck: Great!"
          },
          "value": "4"
        },
        {
          "text": {
            "type": "plain_text",
            "text": ":simple_smile: Good"
          },
          "value": "3"
        },
        {
          "text": {
            "type": "plain_text",
            "text": ":neutral_face: Okay"
          },
          "value": "2"
        },
        {
          "text": {
            "type": "plain_text",
            "text": ":disappointed: Poor"
          },
          "value": "1"
        }
      ]
    },
    "label": {
      "type": "plain_text",
      "text": "Your Rating:"
    },
    "hint": {
      "type": "plain_text",
      "text": "What did you think of the event's overall quality? This helps us determine which events to follow / invest in (or avoid) in the future."
    }
  };
};
