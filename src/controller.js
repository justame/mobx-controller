import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {inject} from 'mobx-react';
import PropTypes from 'prop-types';


function getHOC(ctrlName, Ctrl, ComponentClass, mapper) {
  class ControllerHOC extends React.Component {
    static displayName = `controller ${ctrlName}`;

    controller;
    componentWillMount() {
      if (this.props[ctrlName]) {
        this.controller = new this.props[ctrlName](this.props.stores);
      } else {
        this.controller = new Ctrl(this.props.stores);
      }
    }
    componentWillUnmount() {
      if (this.controller.$onDestroy) {
        this.controller.$onDestroy();
      }
      this.controller = null;
    }
    render() {
      const newProps = {};
      for (const key in this.props) {
        if (key !== 'stores' && Object.prototype.hasOwnProperty.call(this.props, key)) {
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
        newProps[ctrlName] = this.controller;
      }

      return React.createElement(ComponentClass, newProps);
    }
  }
  hoistStatics(ControllerHOC, ComponentClass);

  ControllerHOC.propTypes = {
    stores: PropTypes.object.isRequired
  };

  const WrapperHOC = props => {
    return React.createElement(ControllerHOC, props);
  };

  WrapperHOC.originalComponent = ComponentClass;

  return WrapperHOC;
}

export default function controller(ctrlName, Ctrl, mapper) {
  return function (componentClass) {
    return inject(stores => {
      return {stores};
    })(getHOC(ctrlName, Ctrl, componentClass, mapper));
  };
}
