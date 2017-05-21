'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _stores = require('./demo/stores');

var _stores2 = _interopRequireDefault(_stores);

var _demo = require('./demo/demo.component');

var _demo2 = _interopRequireDefault(_demo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mobx.useStrict)(true);

var stores = (0, _stores2.default)();
_reactDom2.default.render(_react2.default.createElement(
  _mobxReact.Provider,
  stores,
  _react2.default.createElement(_demo2.default, { test: 'yaron' })
), document.getElementById('root'));