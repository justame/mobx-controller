import {observable, computed, action, useStrict} from 'mobx';

class DemoStore {
  @observable user ={
    name: 'Yaron',
    age: 18
  }

  @action changeName(name) {
    this.user.name = name;
  }
}

export default function getStores() {
  return {
    demoStore: new DemoStore()
  };
}
