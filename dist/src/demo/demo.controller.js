'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _mobx = require('mobx');

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

var DemoCtrl = (_class = function () {
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
    key: 'changeAge',
    value: function changeAge() {
      this.demoStore.user.age = 19;
    }
  }, {
    key: 'user',
    get: function get() {
      return this.demoStore.user;
    }
  }]);

  return DemoCtrl;
}(), (_applyDecoratedDescriptor(_class.prototype, 'user', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'user'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'changeName', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'changeName'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'changeAge', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'changeAge'), _class.prototype)), _class);