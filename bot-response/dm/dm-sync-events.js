/*------------------
   DM SYNC EVENTS
------------------*/

module.exports = async (app, userID, slackErr) => {
  // Confirm events synced with Airtable and send DM to user
  try {
    const confirmSyncDM = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: userID,
      text: `:arrows_counterclockwise: *I've successfully synced with the <https://airtable.com/${process.env.AIRTABLE_TABLE_ID}/${process.env.AIRTABLE_VIEW_ID}|events in Airtable>.*\nI rescheduled followups for upcoming events and updated App Homes for active users.`,
      unfurl_links: false,
      unfurl_media: false
    });
  }
  catch (err) {
    slackErr(app, userID, err);
  }
}
