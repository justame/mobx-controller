'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _demo = require('./demo.controller');

var _demo2 = _interopRequireDefault(_demo);

var _controller = require('../controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Demo = (_dec = (0, _controller2.default)('demoCtrl', _demo2.default), _dec(_class = (0, _mobxReact.observer)(_class = function (_React$Component) {
  _inherits(Demo, _React$Component);

  function Demo() {
    _classCallCheck(this, Demo);

    return _possibleConstructorReturn(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).apply(this, arguments));
  }

  _createClass(Demo, [{
    key: 'render',
    value: function render() {
      var demoCtrl = this.props.demoCtrl;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Hello ',
          demoCtrl.user.name
        ),
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return demoCtrl.changeName('Jack');
            } },
          'Change My Name Async'
        ),
        demoCtrl.isChangingName ? _react2.default.createElement(
          'span',
          null,
          ' Changing ... '
        ) : null
      );
    }
  }]);

  return Demo;
}(_react2.default.Component)) || _class) || _class);


Demo.originalComponent.propTypes = {
  demoCtrl: _propTypes2.default.object.isRequired
};

exports.default = Demo;