import 'react-hot-loader/patch';
import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import App from './containers/appContainer.jsx';
import store from './flux/store';

const LOG_RENDER = false;
console.renderLog = function renderLog(...msg) {
    if (LOG_RENDER) {
        console.log(...msg);
    }
};

render(
    <AppContainer>
        <Provider store={store}>
            <App/>
        </Provider>
    </AppContainer>,
    document.querySelector('#app'));

if (module && module.hot) {
    module.hot.accept('./app.jsx', () => {
        // eslint-disable-next-line global-require
        const NextApp = require('./app.jsx').default;
        render(
            <AppContainer>
                <Provider store={store}>
                    <NextApp/>
                </Provider>
            </AppContainer>,
            document.querySelector('#app'));
    });
}
