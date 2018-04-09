import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import { notification } from 'antd';

import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './features';
import globalStyles from './helpers/globalStyles';
import migrations from './helpers/migrations';

// eslint-disable-next-line
injectGlobal`${globalStyles}`;

const persistConfig = {
  version: 2,
  key: 'root',
  storage,
  migrate: createMigrate(migrations),
  whitelist: ['timeline'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);
const persistor = persistStore(store);
// persistor.purge();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

const handleServiceWorkerUpdate = () => {
  notification.info({
    message: 'Update ready',
    description:
      'An update for poe.guide is ready, please reload your browser.',
  });
};

registerServiceWorker({
  onUpdate: handleServiceWorkerUpdate,
});
