import {computed, action} from 'mobx';

class DemoCtrl {
  constructor({demoStore}) {
    this.demoStore = demoStore;
  }

  @computed get user() {
    return this.demoStore.user;
  }

  @action changeName() {
    this.demoStore.user.name = 'moshe';
  }

  @action changeAge() {
    this.demoStore.user.age = 19;
  }
}
