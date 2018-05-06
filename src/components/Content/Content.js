import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';

const { Content } = Layout;

class C extends PureComponent {
	render() {
		return (
			<Content>Content</Content>
		);
	}
}

const mapStateToProps = ({ data, user }) => {
	return {
		data, user
	};
};

export default connect(mapStateToProps)(C);