const slackErr = require('./../../utils/error-slack');

/*------------------
   DM CONFIRM NEW
------------------*/

module.exports = async (app, bc, data, edit) => {
  // Confirm form submission by sending DM to user
  try {
    const confirmDM = await app.client.chat.postMessage({
      token: bc.botToken,
      channel: bc.userID,
      text: `${edit ? ':writing_hand:' : ':tada:'} *Thank you for ${edit ? 'updating information' : 'telling me'} about your upcoming event: "${data.event_name}."*\nTeammates may reach out to provide you with any support you might need (rehearsal, slide review, professional speaker coaching, assistance getting swag or equipment, promotion of your event, etc.).\nIf you'd like to view or edit your upcoming events at any time or fill out a report once this event is over, you can do so in my :house: *<slack://app?team=${process.env.SLACK_TEAM_ID}&id=${process.env.SLACK_APP_ID}&tab=home|App Home tab>*.`
    });
  }
  catch (err) {
    slackErr(app, bc.userID, err);
  }
}
