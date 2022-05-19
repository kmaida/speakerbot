/*------------------
OUTPUT ERROR IN SLACK
------------------*/

const errSlack = async (app, channel, err) => {
  const msg = err.message || err;
  console.error('An error occurred:', msg);
  // try {
  //   const sendErr = await app.client.chat.postMessage({
  //     token: process.env.SLACK_BOT_TOKEN,
  //     channel: channel,
  //     text: ":x: I'm sorry, I couldn't do that because an error occurred: ```" + JSON.stringify(msg) + "```"
  //   });
  // }
  // catch (err) {
  //   console.error(err);
  // }
};

module.exports = errSlack;
