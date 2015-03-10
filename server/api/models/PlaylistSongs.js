/**
 * Created by nthanhduc on 3/5/15.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PlaylistSongSchema = new Schema({
  id_playlist: String,
  id_song: String
});

module.exports = mongoose.model('PlaylistSongs', PlaylistSongSchema);