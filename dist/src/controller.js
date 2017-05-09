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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable */


var injectorContextTypes = {
  mobxStores: _mobxReact.PropTypes.objectOrObservableObject
};
Object.seal(injectorContextTypes);

var proxiedInjectorProps = {
  contextTypes: {
    get: function get() {
      return injectorContextTypes;
    },
    set: function set(_) {
      console.warn('Mobx Injector: you are trying to attach `contextTypes` on an component decorated with `inject` (or `observer`) HOC. Please specify the contextTypes on the wrapped component instead. It is accessible through the `wrappedComponent`');
    },

    configurable: true,
    enumerable: false
  },
  isMobxInjector: {
    value: true,
    writable: true,
    configurable: true,
    enumerable: true
  }
};

/**
 * Store Injection
 */
function createStoreInjector(ctrlName, Ctrl, component) {
  var displayName = 'inject-' + (component.displayName || component.name || component.constructor && component.constructor.name || 'Unknown');

  var Injector = function (_Component) {
    _inherits(Injector, _Component);

    function Injector() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Injector);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Injector.__proto__ || Object.getPrototypeOf(Injector)).call.apply(_ref, [this].concat(args))), _this), _this.storeRef = function (instance) {
        _this.wrappedInstance = instance;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Injector, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.controller = new Ctrl(this.context.mobxStores);
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
        // Optimization: it might be more efficient to apply the mapper function *outside* the render method
        // (if the mapper is a function), that could avoid expensive(?) re-rendering of the injector component
        // See this test: 'using a custom injector is not too reactive' in inject.js
        var newProps = {};
        for (var key in this.props) {
          if (this.props.hasOwnProperty(key)) {
            newProps[key] = this.props[key];
          }
        }
        var additionalProps = (this.context.mobxStores || {}, newProps, this.context) || {};
        for (var _key2 in additionalProps) {
          newProps[_key2] = additionalProps[_key2];
        }
        newProps.ref = this.storeRef;
        newProps[ctrlName] = this.controller;

        return _react2.default.createElement(component, newProps);
      }
    }]);

    return Injector;
  }(_react.Component);

  // Static fields from component should be visible on the generated Injector


  Injector.displayName = displayName;
  (0, _hoistNonReactStatics2.default)(Injector, component);

  Injector.wrappedComponent = component;
  Object.defineProperties(Injector, proxiedInjectorProps);

  return Injector;
}

// function grabStoresByName(storeNames) {
//   return function (baseStores, nextProps) {
//     storeNames.forEach(storeName => {
//       if (storeName in nextProps) // prefer props over stores
//         {
//         return;
//       }
//       if (!(storeName in baseStores)) {
//         throw new Error('MobX observer: Store \'' + storeName + '\' is not available! Make sure it is provided by some Provider');
//       }
//       nextProps[storeName] = baseStores[storeName];
//     });
//     return nextProps;
//   };
// }

/**
 * higher order component that injects stores to a child.
 * takes either a varargs list of strings, which are stores read from the context,
 * or a function that manually maps the available stores from the context to props:
 * storesToProps(mobxStores, props, context) => newProps
 */
function controller(ctrlName, Ctrl) {
  return function (componentClass) {
    return createStoreInjector(ctrlName, Ctrl, componentClass);
  };
}