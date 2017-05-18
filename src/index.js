import React from 'react';
import ReactDOM from 'react-dom';
import {observable, computed, action, useStrict} from 'mobx';
import {Provider, observer} from 'mobx-react';
import controller from './controller';

useStrict(true);





@controller('demoCtrl', DemoCtrl, mapper)
@observer
class Demo extends React.Component {
  render() {
    console.log('render');
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
  console.log(ownProps);
  return {
    user: ctrl.user,
    changeName: () => ctrl.changeName(),
    changeAge: () => ctrl.changeAge(),
    demoCtrl: ctrl
  };
}



const stores = {
  demoStore: new DemoStore()
};
ReactDOM.render(
  <Provider {...stores}>
    <Demo test="yaron"/>
  </Provider>,
    document.getElementById('root')
  );
