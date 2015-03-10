'use strict';

var should = require('should');
var requireHelper = require('require_helper');
var utilityService = requireHelper('api/services/UtilityService.js');

describe('Test Utility Service', function() {
  it('Test hello function', function() {
    (utilityService.hello('Name')).should.be.exactly('Hello: Name');
  });

  it('Test helloWorld function', function() {
    (utilityService.helloWorld('Name')).should.be.exactly('Hello World: Name');
  });
});
