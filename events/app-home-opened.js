const userHomeStore = require('./../data/userhome-db');
const homeBlocks = require('../bot-response/blocks-home/blocks-home');
const errSlack = require('./../utils/error-slack');
// Imports shared between actions
const triggerHomeViewUpdate = require('./../triggers/trigger-home-view-update');
const blocksEventReport = require('./../bot-response/blocks-event-report');
// Actions
const actionSelectChannel = require('./../triggers/action-select-channel');
const actionSelectAdmins = require('./../triggers/action-select-admins');
const actionSyncEvents = require('./../triggers/action-sync-events');
const actionListEvent = require('./../triggers/action-list-event-home');
const actionNewReport = require('./../triggers/action-new-report');
const actionAddReport = require('./../triggers/action-report-home');
const actionEditEvent = require('./../triggers/action-edit-event');
const actionEditReport = require('./../triggers/action-edit-report');

/*------------------
  APP HOME OPENED
------------------*/

const appHomeOpened = async (app, at, store) => {
  app.event('app_home_opened', async ({ event, context }) => {
    const settings = await store.getSettings();
    const localHomeParams = {
      userID: event.user,
      botID: context.botUserId,
      channel: settings.channel,
      admins: settings.admins
    };
    const composedView = await homeBlocks(localHomeParams, at);

    // Find the bot user ID to set in .env:
    // Uncomment the following line
    // Open the App Home, and check console logs
    // console.log('Bot User ID:', localHomeParams.botID);

    // Publish this user's home view
    try {
      const showHomeView = await app.client.views.publish({
        token: context.botToken,
        user_id: localHomeParams.userID,
        view: {
          "type": "home",
          "blocks": composedView
        }
      });
      // Set this user's home view ID in database
      const userHome = await userHomeStore.setUserHomeView(localHomeParams.userID, showHomeView.view.id);
    }
    catch (err) {
      errSlack(app, localHomeParams.userID, err);
    }
  });

  // Actions
  actionSelectChannel(app, store, userHomeStore, at, triggerHomeViewUpdate, errSlack);
  actionSelectAdmins(app, store, userHomeStore, at, triggerHomeViewUpdate, errSlack);
  actionSyncEvents(app, at, store);
  actionListEvent(app, store, errSlack);
  actionNewReport(app, store, blocksEventReport, errSlack);
  actionAddReport(app, store, blocksEventReport, errSlack);
  actionEditReport(app, store, blocksEventReport, errSlack);
  actionEditEvent(app, store, errSlack);
}

module.exports = appHomeOpened;
