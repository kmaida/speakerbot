const slackErr = require('./../../utils/error-slack');

/*------------------
 DM CONFIRM REPORT
------------------*/

module.exports = async (app, bc, data, edit) => {
  // Confirm form submission by sending DM to user
  try {
    const confirmDM = await app.client.chat.postMessage({
      token: bc.botToken,
      channel: bc.userID,
      text: `${edit ? ':writing_hand:' : ':confetti_ball:'} *Thank you for ${edit ? 'updating' : 'sharing'} your "${data.event_name}" post-event report!*\nTeammates may follow up with you if we should get more deeply involved in this event, reach out to community members you networked with, promote your involvement and content from the event, process product feedback, etc.\nIf you need to view or edit your event reports at any time, you can do so in my :house: *<slack://app?team=${process.env.SLACK_TEAM_ID}&id=${process.env.SLACK_APP_ID}&tab=home|App Home tab>*.`
    });
  }
  catch (err) {
    slackErr(app, bc.userID, err);
  }
}
