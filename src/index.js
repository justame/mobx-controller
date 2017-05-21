import React from 'react';
import ReactDOM from 'react-dom';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';

import getStores from './demo/stores';
import Demo from './demo/demo.component';

useStrict(true);

const stores = getStores();
ReactDOM.render(
  <Provider {...stores}>
    <Demo test="yaron"/>
  </Provider>,
    document.getElementById('root')
  );
