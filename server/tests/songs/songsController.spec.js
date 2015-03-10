/**
 * Created by dminhquan on 3/3/2015.
 */
'use strict';

var Sails = require('sails');
var request = require('supertest');
var rc = require('rc');
var sails;
var requireHelper = require('require_helper');
var db = requireHelper('api/services/dbService.js');

describe('songsController', function() {
  before(function(done) {
    Sails.lift(rc('sails'), function(err, server) {
      sails = server;

      db.connect();

      if (err){
        return done(err);
      }
      done(err, sails);
    });
  });

  it('POST api/songs/query', function(done) {
    request(sails.hooks.http.app)
      .post('/api/songs/query')	  
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        //res.body.should.be.instanceof(Array);
        done();
      });
  });

  after(function(done) {
    // here you can clear fixtures, etc.
    sails.lower(function(){
      db.disconnect(done);
    });
  });
});
