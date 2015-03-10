/**
 * SongsController
 *
 * @description :: Server-side logic for managing songs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
'use strict';

var Songs = require('../models/Songs.js');
var utility = require('../services/UtilityService.js');

module.exports = {
  index: function(req, res){
    var reqObj = req.body;
    var sort = reqObj.sort;
    var search = reqObj.search;
    var limit = parseInt(reqObj.limit);
    var offset = parseInt(reqObj.offset),
    skip = (offset && offset > 0)?(offset - 1)*limit:0;
    var qr = Songs.find();
    var totalSongs = 0;

    var searchObj = utility.getSearchRequest(search);
    if(searchObj) {
      qr = Songs.find(searchObj);
      Songs.find(searchObj).count(function(err, count){
        totalSongs = count;
      });
    }else {
      Songs.count(function(err, count){
        totalSongs = count;
      });
    }

    if(limit) {
      qr = qr.limit(limit).skip(skip);
    }

    var sortObj = utility.getSortRequest(sort);
    if(sortObj) {
      qr = qr.sort(sortObj);
    }

    qr.exec(function (err, songs) {
      if (err) {return res.negotiate(err);}
      var rs = {
        data : (songs.length > 0)?songs:[],
        total: totalSongs
      };
      return res.json(200, rs);
    });
  },
  create: function(req, res){
    var reqObj = req.body;
    if (req.wantsJSON) {
      if(reqObj.title) {
        Songs.find({title:reqObj.title}).exec(function (err, songs) {
          if(songs.length > 0) {
            return res.json(200, {message:'This title is existed in DB'});
          }else {
            Songs.create(reqObj, function(err, song) {
              return res.json(201, song);
            });
          }
        });
      }else {
        return res.json(200, {message:'This title is empty'});
      }
    }
  },
  update: function(req, res) {
    var reqObj = req.body;
    var id = reqObj._id;
    if (req.wantsJSON) {
      if(!id) {
        return res.json(200, {message:'This object must have id'});
      }
      delete reqObj._id;
      Songs.update({_id:id}, reqObj, {upsert:true}).exec(function (/*err*/) {
        return res.json(200, {message:'Update successfully'});
      });
    }
  },
  delete: function(req, res) {
    var reqArr = req.body;
    for(var i= 0, len = reqArr.length; i<len; i++) {
      var id = reqArr[i];
      Songs.findByIdAndRemove(id).exec();
    }
    return res.json(200, {message:'Delete successfully'});
  }
};
