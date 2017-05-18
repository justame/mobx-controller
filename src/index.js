import React from 'react';
import ReactDOM from 'react-dom';
import {observable, computed, action, useStrict, toJS} from 'mobx';
import {Provider, observer} from 'mobx-react';
import controller from './controller';

useStrict(true);

class DemoStore {
  @observable user = {
    name: 'Yaron Nachshon',
    age: 18,
    country: 'Israel'
  };
}

class DemoCtrl {
  constructor({demoStore}) {
    console.log('constrctor');
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

@controller('demoCtrl', DemoCtrl)
@observer
class Demo extends React.Component {
  render() {
    const {demoCtrl} = this.props;
    return (<div>
      Hello {demoCtrl.user.name}
      Hello {demoCtrl.user.age}
      <button onClick={() => demoCtrl.changeName()}>
        Click
      </button>
      <button onClick={() => demoCtrl.changeAge()}>
        Click
      </button>
    </div>);
  }
}

Demo.originalComponent.propTypes = {
  demoCtrl: React.PropTypes.object.isRequired,
};

function mapper(ctrl, ownProps) {
  console.log(ctrl, ownProps);
  return {
    user: ctrl.user,
    changeName: () => ctrl.changeName(),
    changeAge: () => ctrl.changeAge()
  };
}



const stores = {
  demoStore: new DemoStore()
};
ReactDOM.render(
  <Provider {...stores}>
    <Demo/>
  </Provider>,
    document.getElementById('root')
  );
