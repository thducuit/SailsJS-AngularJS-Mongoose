/**
 * Created by nthanhduc on 3/4/15.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PlaylistSchema = new Schema({
  title: String,
  description: String
});

module.exports = mongoose.model('Playlist', PlaylistSchema);