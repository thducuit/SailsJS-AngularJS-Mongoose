/**
* Songs.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SongSchema = new Schema({
  title: String,
  description: String
});

module.exports = mongoose.model('Songs', SongSchema);
