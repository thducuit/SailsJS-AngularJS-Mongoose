/**
 * Created by nthanhduc on 3/4/15.
 */
'use strict';

var Songs = require('../models/Songs.js');
var Playlists = require('../models/Playlists.js');
var PlaylistSongs = require('../models/PlaylistSongs.js');

module.exports = {
  index: function(req, res){
    var reqObj = req.body;
    var sort = reqObj.sort;
    var limit = parseInt(reqObj.limit);
    var offset = parseInt(reqObj.offset),
    skip = (offset && offset > 0)?(offset - 1)*limit:0;
    var qr = Playlists.find();
    var totalPlaylist = 0;

    var searchObj = utility.getSearchRequest(search);
    if(searchObj) {
      qr = Playlists.find(searchObj);
      Playlists.find(searchObj).count(function(err, count){
        totalPlaylist = count;
      });
    }else {
      Playlists.count(function(err, count){
        totalPlaylist = count;
      });
    }

    if(limit) {
      qr = qr.limit(limit).skip(skip);
    }

    var sortObj = utility.getSortRequest(sort);
    if(sortObj) {
      qr = qr.sort(sortObj);
    }

    qr.exec(function (err, playlists) {
      if (err) return res.negotiate(err);
      var rs = {
          data : (playlists.length > 0)?playlists:[],
          total: totalPlaylist
      };
      return res.json(200, rs);
    });
  },
  create: function(req, res){
    var reqObj = req.body;
    if (req.wantsJSON) {
      if(reqObj.title) {
        Playlists.find({title:reqObj.title}).exec(function (err, playlists) {
          if(playlists.length > 0) {
            return res.json(200, {message:'This title is existed in DB'});
          }else {
            Playlists.create(reqObj, function(err, playlist) {
              return res.json(201, playlist);
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
      Playlists.update({_id:id}, reqObj, {upsert:true}).exec(function (err) {
        return res.json(200, {message:'Update successfully'});
      });
    }
  },
  delete: function(req, res) {
    var reqArr = req.body;
    for(var i= 0, len = reqArr.length; i<len; i++) {
      var id = reqArr[i];
      var obj = {
        id_playlist:id
      };
      Playlists.findByIdAndRemove(id).exec();
      PlaylistSongs.findOneAndRemove(obj).exec();
    }
    return res.json(200, {message:'Delete successfully'});
  }
};