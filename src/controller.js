import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {inject} from 'mobx-react';
import PropTypes from 'prop-types';


function getHOC(ctrlName, Ctrl, ComponentClass, mapper) {
  class ControllerHOC extends React.Component {
    controller;
    componentWillMount() {
      this.controller = new Ctrl(this.props.stores);
    }
    componentWillUnmount() {
      if (this.controller.$destroy) {
        this.controller.$destroy();
      }
      this.controller = null;
    }
    render() {
      const newProps = {};
      for (const key in this.props) {
        if (Object.prototype.hasOwnProperty.call(this.props, key)) {
          newProps[key] = this.props[key];
        }
      }
      if (typeof mapper === 'function') {
        const additionalProps = mapper(this.controller, newProps);
        for (const key in additionalProps) {
          if (!Object.prototype.hasOwnProperty.call(this.props, key)) {
            newProps[key] = additionalProps[key];
          }
        }
      } else {
        newProps[ctrlName] = this.props[ctrlName] || this.controller;
      }
      return React.createElement(ComponentClass, newProps);
    }
  }
  hoistStatics(ControllerHOC, ComponentClass);
  ControllerHOC.wrappedComponent = ComponentClass;
  ControllerHOC.propTypes = {
    stores: PropTypes.object.isRequired
  };
  return props => {
    return <ControllerHOC {...props}><ComponentClass/></ControllerHOC>;
  };
}

export default function controller(ctrlName, Ctrl, mapper) {
  return function (componentClass) {
    return inject(stores => {
      return {stores};
    })(getHOC(ctrlName, Ctrl, componentClass, mapper));
  };
}
