import { configureStore } from '@reduxjs/toolkit';
import 'antd/dist/antd.css';
import { setup } from 'goober';
import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import rootReducer from './redux/rootReducer';
import isDev from './util/isDev';

setup(createElement);

const store = configureStore({
	reducer: rootReducer,
	devTools: isDev(),
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<div>Hallo</div>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);
