'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = start;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _vm = require('./vm');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function start() {
  var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;

  var app = (0, _express2.default)();

  app.use((0, _expressSession2.default)({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

  app.use('/', function (req, res) {
    if (!req.session.visitCount) {
      req.session.visitCount = 0;
    }

    req.session.visitCount++;

    res.send((0, _vm.renderVM)('./src/index.vm', {
      visitCount: req.session.visitCount
    }));
  });

  return app.listen(port, function () {
    console.log('Fake server is running on port ' + port);
  });
}