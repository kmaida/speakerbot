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
      MONGODB
------------------*/
// Address server discovery deprecation warning
mongoose.set('useUnifiedTopology', true);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const mon = mongoose.connection;
// Capture connection errors
mon.on('error', console.error.bind(console, 'MongoDB Connection Error. Please make sure that', process.env.MONGO_URI, 'is running.'));
// Open connection
mon.once('open', function () {
  console.info('Connected to MongoDB:', process.env.MONGO_URI);
});

/*------------------
    ON APP INIT
------------------*/
// Get bot configuration settings from MongoDB
store.initSettings();
// Set up weekly roundups
jobs.eventsThisWeek(app, at);
// Schedule followups and set up nightly event syncs
jobs.setupEventSyncs(app, at, store);

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
     START APP
------------------*/
(async () => {
  await app.start(port);
  console.log(`⚡️ speakerbot is running on ${port}!`);
})();
