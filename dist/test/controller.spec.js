// /* eslint-disable */
// import 'jsdom-global/register';
// import React, {createClass, PropTypes} from 'react';
// import ReactDOM from 'react-dom';
// import {mount} from 'enzyme';
// import mobx, {action, observable, computed} from 'mobx';
// import {expect} from 'chai';
// import {Provider, observer} from 'mobx-react';
// import controller from '../src/controller';
// // import sinon from 'sinon';

// class MyCtrl {
//   constructor() {
//     observable(this.user = {
//       name: 'Jack'
//     });
//   }
// }

// describe('inject based context', () => {
//   describe('basic context', () => {


//     it('should pass controller via props', () => {
//       const C = controller('myCtrl', MyCtrl)(observer(class MyComponent extends React.Component {
//         render() {
//           return <div>context:{ this.props.myCtrl.user.name }</div>;
//         }
//     }));
//       const B = () => <C/>;
//       const A = () =>
//         <Provider foo="bar">
//           <B/>
//         </Provider>;
//       const wrapper = mount(<A/>);
//       expect(wrapper.find('div').text()).to.equal('context:Jack');
//     });
//   });
// });
"use strict";