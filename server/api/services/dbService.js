/**
 * Created by dminhquan on 3/5/2015.
 */
'use strict';

var mongoose = require('mongoose');

module.exports = {
  connect: function(success, error){
    mongoose.connect('mongodb://localhost:27018/my-app-dev', {
      user: 'dbadmin',
      pass: 'dbpasswd'
    });

    /**
     * We check if the connection is ok
     * If so we will continue to load everything ...
     */
    var db = mongoose.connection;

    console.log('Try to connect to MongoDB via Mongoose ...');

    db.on('error', function (){
      console.log('Connect to MongoDB Fail Fail Fail Fail Fail Fail Fail Fail!');
    });
    db.once('open', function callback() {
      console.log('Connected to MongoDB !');
    });
  },
  disconnect: function(done){
    mongoose.connection.close(function(){
      done();
    });
  }
};
