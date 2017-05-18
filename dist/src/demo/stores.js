'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getStores;

var _mobx = require('mobx');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DemoStore = function DemoStore() {
  _classCallCheck(this, DemoStore);
};

function getStores() {
  return {
    demoStore: new DemoStore()
  };
}