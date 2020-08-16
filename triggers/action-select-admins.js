/*------------------
 ACTION: SELECT ADMINS
 Admins can select
 admin users
------------------*/

module.exports = (app, store, userHomeStore, at, triggerHomeViewUpdate, errSlack) => {
  app.action('a_select_admins', async ({ action, ack, context, body }) => {
    await ack();
    // Set the new admins
    const newAdmins = action.selected_users;
    const settings = await store.setAdmins(newAdmins);
    // Update the admins in the home view for all users
    try {
      const allUserHomes = await userHomeStore.getUserHomes();
      allUserHomes.forEach(async (userHome) => {
        const userHomeParams = {
          userID: userHome.userID,
          viewID: userHome.viewID,
          botID: context.botUserId,
          channel: settings.channel,
          admins: newAdmins
        };
        await triggerHomeViewUpdate(app, userHomeParams, at);
      });
    }
    catch (err) {
      errSlack(app, body.user.id, err);
    }
  });
};
