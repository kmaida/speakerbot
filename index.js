require('dotenv').config();
const { App } = require('@slack/bolt');
const at = require('./data/airtable');
const jobs = require('./schedule/jobs');
const utils = require('./utils/utils');
const mongoose = require('mongoose');
const store = require('./data/settings-db');

/*------------------
  CREATE BOLT APP
------------------*/
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});
const port = process.env.PORT || 3000;

/*------------------
     TRIGGERS
------------------*/
require('./triggers/trigger-new')(app);
require('./triggers/trigger-report')(app);
require('./triggers/action-snooze-followup')(app, at);

/*------------------
  VIEW SUBMISSIONS
------------------*/
require('./view-submissions/submit-new')(app, at, utils);
require('./view-submissions/submit-report')(app, at, utils);
require('./view-submissions/submit-snooze-followup')(app, at, utils);

/*------------------
  APP HOME OPENED
------------------*/
require('./events/app-home-opened')(app, at, store);

/*------------------
    APP MENTION
------------------*/
require('./events/app-mention')(app);

/*------------------
       BOT DM
------------------*/
require('./events/bot-dm')(app);

/*------------------
   START DB & APP
------------------*/

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    // Get bot configuration settings from MongoDB
    store.initSettings();
    // Set up weekly roundups
    jobs.eventsThisWeek(app, at);
    // Schedule followups and set up nightly event syncs
    jobs.setupEventSyncs(app, at, store);
    // Start the Slack app
    (async () => {
      await app.start(port);
      console.log(`⚡️ speakerbot is running on ${port}!`);
    })();
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
