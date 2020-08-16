/*------------------
BLOCKS: APP HOME INTRO
------------------*/

const blocksHomeIntro = (homeParams) => {
  return [
    {
      "type": "section",
      "accessory": {
        "type": "image",
        "image_url": "https://avatars.slack-edge.com/2020-05-15/1127091402914_367a18732ae0e6103825_512.png",
        "alt_text": "speakerbot"
      },
      "text": {
        "type": "mrkdwn",
        "text": `:wave: *Hello, <@${homeParams.userID}>!* I'm <@${homeParams.botID}>, your friendly *Speaking Events Manager Bot* :microphone::robot_face:\n\nIt's my job to help folks communicate about their speaking events so we can fully support their activities and follow up to gather insights and important takeaways.\n\nWhenever someone *lists a new event* or *submits an event report*, I share that in <#${homeParams.channel}>. Anyone can check out the feed there!`
      },
    }
  ];
};

module.exports = blocksHomeIntro;
