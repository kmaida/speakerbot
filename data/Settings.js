const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*------------------
  SETTINGS SCHEMA
------------------*/

const settingsSchema = new Schema({
  channel: { type: String, required: true },
  admins: [String]
});

module.exports = mongoose.model('SpeakerbotSettings', settingsSchema);
