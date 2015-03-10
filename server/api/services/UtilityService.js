/**
 * Created by dminhquan on 3/4/2015.
 */
'use strict';

module.exports = {
  /*hello: function(name){
    return 'Hello: ' + name;
  },
  helloWorld: function(name){
    return 'Hello World: ' + name;
  }*/

  getSortRequest: function(sort) {
    if(sort) {
      var key = sort.split(',')[0];
      var criteria = sort.split(',')[1];
      sort = {};
      sort[key] = criteria;
      return sort;
    }
    return false;
  },
  getSearchRequest: function(search) {
    if(search && typeof(search) === 'object') {
      var keyword = search.key;
      var value = new RegExp(search.value);
      search = {};
      search[keyword] = value;
      return search;
    }
    return false;
  }
};
