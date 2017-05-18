'use strict';

require('babel-polyfill');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _http = require('axios/lib/adapters/http');

var httpAdapter = _interopRequireWildcard(_http);

var _wixAxiosConfig = require('wix-axios-config');

var _testCommon = require('./test-common');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsdom = require('jsdom').jsdom;

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(function (property) {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

(0, _wixAxiosConfig.wixAxiosConfig)(_axios2.default, { baseURL: (0, _testCommon.getTestBaseUrl)() });
_axios2.default.defaults.adapter = httpAdapter.default;