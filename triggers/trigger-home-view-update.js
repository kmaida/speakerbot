const homeBlocks = require('./../bot-response/blocks-home/blocks-home');
const errSlack = require('./../utils/error-slack');

// Update the app home view (when data in it has changed)
const triggerHomeViewUpdate = async (app, homeParams, at) => {
  const composedView = await homeBlocks(homeParams, at);
  try {
    const updateHomeView = await app.client.views.update({
      token: process.env.SLACK_BOT_TOKEN,
      user_id: homeParams.userID,
      view_id: homeParams.viewID,
      view: {
        "type": "home",
        "blocks": composedView
      }
    });
    console.log('TRIGGER HOME VIEW UPDATE: app home view updated for viewID', homeParams.viewID);
  }
  catch (err) {
    errSlack(app, homeParams.userID, err);
  }
}

module.exports = triggerHomeViewUpdate;
