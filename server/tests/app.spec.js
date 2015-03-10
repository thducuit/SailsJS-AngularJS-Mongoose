'use strict';

var should = require('should');
var requireHelper = require('require_helper');
var db = requireHelper('api/services/dbService.js');

describe('app', function() {
  it('Test connection', function() {
    db.connect(function success(){
      return true;
    }, function error(){
      return false;
    });
  });

  after(function(done){
    db.disconnect(done);
  });
});
