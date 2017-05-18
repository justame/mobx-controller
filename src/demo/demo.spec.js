import 'jsdom-global/register';
import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {observable, computed} from 'mobx';
import {Provider, observer} from 'mobx-react';
import controller from '../controller';


describe.only('Controller', () => {
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
      userCtrl: React.PropTypes.object.isRequired
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
      userCtrl: React.PropTypes.object.isRequired
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

  it('should create only one instance of controller', () => {

  });

  it('should call $destroy when component is unmountedt', () => {

  });
});
