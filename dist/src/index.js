'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _desc2, _value2, _class3, _dec, _class4;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

(0, _mobx.useStrict)(true);

var DemoStore = (_class = function DemoStore() {
  _classCallCheck(this, DemoStore);

  _initDefineProp(this, 'user', _descriptor, this);
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'user', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return {
      name: 'Yaron Nachshon',
      age: 18,
      country: 'Israel'
    };
  }
})), _class);
var DemoCtrl = (_class3 = function () {
  function DemoCtrl(_ref) {
    var demoStore = _ref.demoStore;

    _classCallCheck(this, DemoCtrl);

    this.demoStore = demoStore;
  }

  _createClass(DemoCtrl, [{
    key: 'changeName',
    value: function changeName() {
      this.demoStore.user.name = 'moshe';
    }
  }, {
    key: 'user',
    get: function get() {
      return this.demoStore.user;
    }
  }]);

  return DemoCtrl;
}(), (_applyDecoratedDescriptor(_class3.prototype, 'user', [_mobx.computed], Object.getOwnPropertyDescriptor(_class3.prototype, 'user'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'changeName', [_mobx.action], Object.getOwnPropertyDescriptor(_class3.prototype, 'changeName'), _class3.prototype)), _class3);
var Demo = (_dec = (0, _controller2.default)('demoCtrl', DemoCtrl), _dec(_class4 = (0, _mobxReact.observer)(_class4 = function (_React$Component) {
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
        'Hello ',
        demoCtrl.user.name,
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return demoCtrl.changeName();
            } },
          'Click'
        )
      );
    }
  }]);

  return Demo;
}(_react2.default.Component)) || _class4) || _class4);


function mapper(ctrl, ownProps) {
  console.log(ctrl, ownProps);
  return {
    user: ctrl.user,
    changeName: function changeName() {
      return ctrl.changeName();
    }
  };
}

var stores = {
  demoStore: new DemoStore()
};
_reactDom2.default.render(_react2.default.createElement(
  _mobxReact.Provider,
  stores,
  _react2.default.createElement(Demo, null)
), document.getElementById('root'));
//# sourceMappingURL=index.js.map
