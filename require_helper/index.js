/**
 * Created by dminhquan on 3/5/2015.
 */
'use strict';

module.exports = function (path) {
  return require((process.env.APP_DIR_FOR_CODE_COVERAGE || '../app/') + path);
};
