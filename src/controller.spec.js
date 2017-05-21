import 'jsdom-global/register';
import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import PropTypes from 'prop-types';
import {observable, expr, action} from 'mobx';
import {Provider, observer} from 'mobx-react';
import controller from './controller';


const jsdom = require('jsdom').jsdom;

global.document = jsdom('');
global.window = document.defaultView;
global.navigator = {
  userAgent: 'node.js'
};

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}
copyProps(document.defaultView, global);

describe('Controller', () => {
  it('should pass controller in props', () => {
    const userStore = {
      name: 'Jack Amsterdam',
      age: 18
    };

    const MyComponent = props => {
      const {userCtrl} = props;
      return (<div>
        <div className="name">
          {userCtrl.userStore.name}
        </div>
        <div className="age">
          {userCtrl.age}
        </div>
      </div>);
    };

    MyComponent.propTypes = {
      userCtrl: PropTypes.object.isRequired
    };

    class MyComponentCtrl {
      userStore;
      constructor({userStore}) {
        this.userStore = userStore;
      }

      get age() {
        return this.userStore.age;
      }

    }

    const WrappedComponent = controller('userCtrl', MyComponentCtrl)(observer(MyComponent));
    const component = mount(<Provider userStore={userStore}><WrappedComponent/></Provider>);

    expect(component.find('.name').text()).to.equal('Jack Amsterdam');
    expect(component.find('.age').text()).to.equal('18');
  });

  it('should pass props with custom mapper injection', () => {
    const userStore = {
      name: 'Jack Amsterdam',
      age: 18
    };

    const MyComponent = props => {
      const {user} = props;
      return (<div>
        <div className="name">
          {user.name}
        </div>
        <div className="age">
          {user.age}
        </div>
      </div>);
    };

    MyComponent.propTypes = {
      user: PropTypes.object.isRequired
    };

    class MyComponentCtrl {
      userStore;
      constructor({userStore}) {
        this.userStore = userStore;
      }

      get age() {
        return this.userStore.age;
      }
    }
    const mapper = ctrl => {
      return {
        user: ctrl.userStore
      };
    };
    const WrappedComponent = controller('userCtrl', MyComponentCtrl, mapper)(observer(MyComponent));
    const component = mount(<Provider userStore={userStore}><WrappedComponent/></Provider>);

    expect(component.find('.name').text()).to.equal('Jack Amsterdam');
    expect(component.find('.age').text()).to.equal('18');
  });

  it('should create only one instance of controller', () => {
    const userStore = {
      name: 'Jack Amsterdam',
      age: 18
    };

    const MyComponent = props => {
      const {user, changeAge} = props;
      return (<div>
        <div className="name">
          {user.name}
        </div>
        <div className="age">
          {user.age}
        </div>
        <button onClick={() => changeAge()}/>
      </div>);
    };

    MyComponent.propTypes = {
      user: PropTypes.object.isRequired,
      changeAge: PropTypes.func.isRequired,
    };

    let instanceCreated = 0;
    class MyComponentCtrl {
      userStore;
      constructor({userStore}) {
        instanceCreated++;
        this.userStore = observable(userStore);
        this.changeAge = action(this.changeAge);
      }

      get age() {
        return expr(() => this.userStore.age);
      }

      changeAge() {
        this.userStore.age = 20;
      }
    }
    const mapper = ctrl => {
      return {
        user: ctrl.userStore,
        changeAge: () => ctrl.changeAge()
      };
    };
    const WrappedComponent = controller('userCtrl', MyComponentCtrl, mapper)(observer(MyComponent));
    const component = mount(<Provider userStore={userStore}><WrappedComponent/></Provider>);

    expect(component.find('.name').text()).to.equal('Jack Amsterdam');
    expect(component.find('.age').text()).to.equal('18');
    expect(component.find('button').simulate('click'));
    expect(component.find('.age').text()).to.equal('20');
    expect(instanceCreated).to.equal(1);
  });

  it('should call $onDestroy when component is unmounted', () => {
    const userStore = {};
    const MyComponent = () => {
      return (<div>
        hello
      </div>);
    };

    let destroyCalledCount = 0;
    class MyComponentCtrl {
      $onDestroy() {
        destroyCalledCount++;
      }
    }

    const WrappedComponent = controller('userCtrl', MyComponentCtrl)(observer(MyComponent));
    const component = mount(<Provider userStore={userStore}><WrappedComponent/></Provider>);
    component.unmount();

    expect(destroyCalledCount).to.equal(1);
  });

  // it('should not inject controller when using custom mapper', () => {

  // });

  // it('should create controller instance if prop name is the same like controller name', () => {

  // });
});
