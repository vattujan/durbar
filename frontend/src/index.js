import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router } from "react-router-dom";
import store from './redux/store';
import { Provider } from 'react-redux';
import I18n from "redux-i18n";
import { ToastContainer } from 'react-toastify';
import { translations } from './translations';

ReactDOM.render(
    <Provider store={store}>
        <I18n translations={translations} initialLang="en" fallbackLang="en">
            <Router>
                <App />
                <ToastContainer />
            </Router>
        </I18n>
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
