import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { Layout } from 'antd';
import cn from 'classnames';

import store from './store';
import history from './history';

import Header from './components/Header';
import Content from './components/Content';

import "./styles.less"

function ApplicationWrapper({ children }) {
	return (
		<Provider store={store}>
			<Router history={history}>
                {children}
			</Router>
		</Provider>
	);
}

class App extends PureComponent {
	render() {
		return (
			<ApplicationWrapper>
				<Layout>
					<Layout>
						<Header/>
						<Content/>
					</Layout>
				</Layout>
			</ApplicationWrapper>
		);
	}
}

export default App;