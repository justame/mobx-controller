import {computed, action, observable} from 'mobx';

export default class DemoCtrl {
  @observable isChangingName = false;

  constructor({demoStore}) {
    this.demoStore = demoStore;
  }

  @computed get user() {
    return this.demoStore.user;
  }

  @action changeName(name) {
    this.isChangingName = true;
    setTimeout(action(() => {
      this.demoStore.changeName(name);
      this.isChangingName = false;
    }), 1500);
  }
}
