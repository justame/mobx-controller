import 'babel-polyfill';
import axios from 'axios';
import * as httpAdapter from 'axios/lib/adapters/http';
import {wixAxiosConfig} from 'wix-axios-config';
import {getTestBaseUrl} from './test-common';


// const jsdom = require('jsdom').jsdom;

// global.document = jsdom('');
// global.window = document.defaultView;
// Object.keys(document.defaultView).forEach(property => {
//   if (typeof global[property] === 'undefined') {
//     global[property] = document.defaultView[property];
//   }
// });

// global.navigator = {
//   userAgent: 'node.js'
// };

wixAxiosConfig(axios, {baseURL: getTestBaseUrl()});
axios.defaults.adapter = httpAdapter.default;
