'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _mobx.useStrict)(true);

var Demo = (_dec = (0, _controller2.default)('demoCtrl', DemoCtrl, mapper), _dec(_class = (0, _mobxReact.observer)(_class = function (_React$Component) {
  _inherits(Demo, _React$Component);

  function Demo() {
    _classCallCheck(this, Demo);

    return _possibleConstructorReturn(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).apply(this, arguments));
  }

  _createClass(Demo, [{
    key: 'render',
    value: function render() {
      console.log('render');
      var demoCtrl = this.props.demoCtrl;

      return _react2.default.createElement(
        'div',
        null,
        'Hello ',
        demoCtrl.user.name,
        'Hello ',
        demoCtrl.user.age,
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return demoCtrl.changeName();
            } },
          'Click'
        ),
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return demoCtrl.changeAge();
            } },
          'Click'
        )
      );
    }
  }]);

  return Demo;
}(_react2.default.Component)) || _class) || _class);


Demo.originalComponent.propTypes = {
  demoCtrl: _react2.default.PropTypes.object.isRequired
};

function mapper(ctrl, ownProps) {
  console.log(ownProps);
  return {
    user: ctrl.user,
    changeName: function changeName() {
      return ctrl.changeName();
    },
    changeAge: function changeAge() {
      return ctrl.changeAge();
    },
    demoCtrl: ctrl
  };
}

var stores = {
  demoStore: new DemoStore()
};
_reactDom2.default.render(_react2.default.createElement(
  _mobxReact.Provider,
  stores,
  _react2.default.createElement(Demo, { test: 'yaron' })
), document.getElementById('root'));