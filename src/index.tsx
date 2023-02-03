import './index.css';

import { configureStore } from '@reduxjs/toolkit';
import { setup } from 'goober';
import { createElement, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Markdown from './MarkdownConverter';
import rootReducer from './redux/rootReducer';
import isDev from './util/isDev';

setup(createElement);

const store = configureStore({
	reducer: rootReducer,
	devTools: isDev(),
});

ReactDOM.render(
	<StrictMode>
		<Provider store={store}>
			<Markdown />
		</Provider>
	</StrictMode>,
	document.getElementById('root'),
);
