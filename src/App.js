import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Router } from 'react-router';
import { Provider, connect } from 'react-redux';
import { Layout } from 'antd';
import cn from 'classnames';

import store from './store';
import history from './history';

import Header from './components/Header';
import Content from './components/Content';
import Sider from './components/Sider';

function ApplicationWrapper({ children }) {
	return (
		<Provider store={store}>
			<Router history={history}>
                {children}
			</Router>
		</Provider>
	);
}

class App extends Component{
	constructor(props) {
		super(props);
		this.state = {
			overlay: false,
		};
	}
	siderToggled = (d) => {
		const collapsed = (d && d.collapsed) || null;
		if (collapsed == null) {
			this.setState({
				overlay: !this.state.collapsed
			});
		} else {
			this.setState({
				overlay: !collapsed,
			});
		}
	}
	getChildContext = () => {
		return { siderToggled: this.siderToggled };
	}
	onAppClick = () => {
		if (this.state.overlay) {
			this.setState({
				overlay: !this.state.overlay,
			});
		}
	}
	render() {
		const appClassName = cn('App', this.state.overlay && 'Overlay');
		return (
			<ApplicationWrapper>
				<Layout>
					<Sider collapsed={!this.state.overlay}/>
					<Layout className={appClassName}
							onClick={this.onAppClick}>
						<Header/>
						<Content/>
					</Layout>
				</Layout>
			</ApplicationWrapper>
		);
	}
}

App.childContextTypes = {
	siderToggled: PropTypes.func,
};

export default App;