import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app.jsx';

render(<AppContainer><App/></AppContainer>, document.querySelector('#app'));

if (module && module.hot) {
    module.hot.accept('./app.jsx', () => {
        // eslint-disable-next-line global-require
        const hotApp = require('./app.jsx').default;
        render(<AppContainer><hotApp/></AppContainer>, document.querySelector('#app'));
    });
}
