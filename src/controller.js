/* eslint-disable */
import React, {Component} from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {reaction, autorun} from 'mobx';
import {PropTypes, observer, inject} from 'mobx-react';


const injectorContextTypes = {
  mobxStores: PropTypes.objectOrObservableObject
};
Object.seal(injectorContextTypes);

const proxiedInjectorProps = {
  contextTypes: {
    get() {
      return injectorContextTypes;
    },
    set(_) {
      console.warn('Mobx Injector: you are trying to attach `contextTypes` on an component decorated with `inject` (or `observer`) HOC. Please specify the contextTypes on the wrapped component instead. It is accessible through the `wrappedComponent`');
    },
    configurable: true,
    enumerable: false
  },
  isMobxInjector: {
    value: true,
    writable: true,
    configurable: true,
    enumerable: true
  }
};

/**
 * Store Injection
 */
function createStoreInjector(ctrlName, Ctrl, component, mapper) {
  const displayName = 'inject-' + (component.displayName || component.name || (component.constructor && component.constructor.name) || 'Unknown');

  class Injector extends Component {

    static displayName = displayName;
    controller;
    storeRef = instance => {
      this.wrappedInstance = instance;
    };

    componentWillMount() {
      this.controller = new Ctrl(this.context.mobxStores);
    }

    componentWillUnmount() {
      if(this.controller.$destroy){
        this.controller.$destroy()
      }
      this.controller = null;
    }

    render() {
      // Optimization: it might be more efficient to apply the mapper function *outside* the render method
      // (if the mapper is a function), that could avoid expensive(?) re-rendering of the injector component
      // See this test: 'using a custom injector is not too reactive' in inject.js
      const newProps = {};
      for (const key in this.props) {
        if (this.props.hasOwnProperty(key)) {
          newProps[key] = this.props[key];
        }
      }
      let additionalProps = {};
      
      if(typeof mapper === 'function'){
        additionalProps = mapper(this.controller, this.props);
      }else{
        additionalProps = (this.context.mobxStores || {}, newProps, this.context) || {};
        additionalProps[ctrlName] = this.controller;
      }

      for (const key in additionalProps) {
        newProps[key] = additionalProps[key];
      }
      newProps.ref = this.storeRef;

      return React.createElement(observer(component), newProps);
    }
  }

  // Static fields from component should be visible on the generated Injector
  hoistStatics(Injector, component);

  Injector.wrappedComponent = component;
  Object.defineProperties(Injector, proxiedInjectorProps);

  return Injector;
}

/**
 * higher order component that injects stores to a child.
 * takes either a varargs list of strings, which are stores read from the context,
 * or a function that manually maps the available stores from the context to props:
 * storesToProps(mobxStores, props, context) => newProps
 */
export default function controller(ctrlName, Ctrl, mapper) {


  function getWrapper(ComponentClass){
    class MyWrapper extends React.Component{
      controller;
      componentWillMount(){
        this.controller = new Ctrl(this.props.stores.stores);
      }
      render(){
        // console.log(this.props.stores)
      const newProps = {};
      for (const key in this.props) {
        if (this.props.hasOwnProperty(key)) {
          newProps[key] = this.props[key];
        }
      }
      newProps[ctrlName] = this.controller;
      return React.createElement(ComponentClass, newProps);
      
      }
    }    
    return (stores)=> {
      return <MyWrapper stores={stores}><ComponentClass/></MyWrapper>
    }
  }

  // return inject((stores) => {
  //   if(typeof mapper === 'function'){
  //     return mapper()
  //   }
  //   return {
  //     [ctrlName]: new Ctrl(stores)
  //   }
  // })
  return function (componentClass) {
    return inject(stores => {
      return {stores}
    })(getWrapper(componentClass))
    // return createStoreInjector(ctrlName, Ctrl, componentClass, mapper);
  };

}
