'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('jsdom-global/register');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _enzyme = require('enzyme');

var _mobx = require('mobx');

var _mobx2 = _interopRequireDefault(_mobx);

var _chai = require('chai');

var _mobxReact = require('mobx-react');

var _controller = require('../src/controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* eslint-disable */


// import sinon from 'sinon';

var MyCtrl = function MyCtrl() {
  _classCallCheck(this, MyCtrl);

  (0, _mobx.observable)(this.user = {
    name: 'Jack'
  });
};

describe('inject based context', function () {
  describe('basic context', function () {

    it('should pass controller via props', function () {
      var C = (0, _controller2.default)('myCtrl', MyCtrl)((0, _mobxReact.observer)(function (_React$Component) {
        _inherits(MyComponent, _React$Component);

        function MyComponent() {
          _classCallCheck(this, MyComponent);

          return _possibleConstructorReturn(this, (MyComponent.__proto__ || Object.getPrototypeOf(MyComponent)).apply(this, arguments));
        }

        _createClass(MyComponent, [{
          key: 'render',
          value: function render() {
            return _react2.default.createElement(
              'div',
              null,
              'context:',
              this.props.myCtrl.user.name
            );
          }
        }]);

        return MyComponent;
      }(_react2.default.Component)));
      var B = function B() {
        return _react2.default.createElement(C, null);
      };
      var A = function A() {
        return _react2.default.createElement(
          _mobxReact.Provider,
          { foo: 'bar' },
          _react2.default.createElement(B, null)
        );
      };
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(A, null));
      (0, _chai.expect)(wrapper.find('div').text()).to.equal('context:Jack');
    });
  });
});