import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import DemoCtrl from './demo.controller';
import controller from '../controller';

@controller('demoCtrl', DemoCtrl)
@observer
class Demo extends React.Component {
  render() {
    const {demoCtrl} = this.props;
    return (<div>
      <h1>
        Hello {demoCtrl.user.name}
      </h1>

      <button onClick={() => demoCtrl.changeName('Jack')}>
        Change My Name Async
      </button>
      {
        demoCtrl.isChangingName ? <span> Changing ... </span> : null
      }
    </div>);
  }
}

Demo.originalComponent.propTypes = {
  demoCtrl: PropTypes.object.isRequired
};

export default Demo;
