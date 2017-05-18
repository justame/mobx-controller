'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = controller;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _mobxReact = require('mobx-react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getHOC(ctrlName, Ctrl, ComponentClass, mapper) {
  var ControllerHOC = function (_React$Component) {
    _inherits(ControllerHOC, _React$Component);

    function ControllerHOC() {
      _classCallCheck(this, ControllerHOC);

      return _possibleConstructorReturn(this, (ControllerHOC.__proto__ || Object.getPrototypeOf(ControllerHOC)).apply(this, arguments));
    }

    _createClass(ControllerHOC, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        if (this.props[ctrlName]) {
          this.controller = new this.props[ctrlName](this.props.stores);
        } else {
          this.controller = new Ctrl(this.props.stores);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.controller.$destroy) {
          this.controller.$destroy();
        }
        this.controller = null;
      }
    }, {
      key: 'render',
      value: function render() {
        var newProps = {};
        for (var key in this.props) {
          if (key !== 'stores' && Object.prototype.hasOwnProperty.call(this.props, key)) {
            newProps[key] = this.props[key];
          }
        }
        if (typeof mapper === 'function') {
          var additionalProps = mapper(this.controller, newProps);
          for (var _key in additionalProps) {
            if (!Object.prototype.hasOwnProperty.call(this.props, _key)) {
              newProps[_key] = additionalProps[_key];
            }
          }
        } else {
          newProps[ctrlName] = this.controller;
        }

        return _react2.default.createElement(ComponentClass, newProps);
      }
    }]);

    return ControllerHOC;
  }(_react2.default.Component);

  (0, _hoistNonReactStatics2.default)(ControllerHOC, ComponentClass);

  ControllerHOC.propTypes = {
    stores: _propTypes2.default.object.isRequired
  };

  var WrapperHOC = function WrapperHOC(props) {
    return _react2.default.createElement(ControllerHOC, props);
  };

  WrapperHOC.originalComponent = ComponentClass;

  return WrapperHOC;
}

function controller(ctrlName, Ctrl, mapper) {
  return function (componentClass) {
    return (0, _mobxReact.inject)(function (stores) {
      return { stores: stores };
    })(getHOC(ctrlName, Ctrl, componentClass, mapper));
  };
}