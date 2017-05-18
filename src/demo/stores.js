import {observable, computed, action, useStrict} from 'mobx';

class DemoStore {

}
export default function getStores() {
  return {
    demoStore: new DemoStore()
  };
}
