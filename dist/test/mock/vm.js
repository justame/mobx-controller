'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderVM = renderVM;

var _velocity = require('velocity');

var _requireReload = require('require-reload');

var _requireReload2 = _interopRequireDefault(_requireReload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadJson(filename) {
  try {
    var reload = (0, _requireReload2.default)(require);
    return reload(filename);
  } catch (e) {}
}

function renderVM(template, data) {
  var engine = new _velocity.Engine({ template: template });
  var velocityData = loadJson('../../velocity.data.js');
  var velocityDataPrivate = loadJson('../../velocity.private.data.js');
  return engine.render(Object.assign({}, velocityData, velocityDataPrivate, data));
}