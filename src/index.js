import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, observer} from 'mobx-react';

class Demo extends React.Component {
  render() {
    return <div> Demo </div>;
  }
}
class DemoStore {

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
