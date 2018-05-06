import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Layout, Menu, Progress, Row, Icon, Button } from 'antd';

const { Header } = Layout;

class H extends PureComponent {
    render() {
        return (
            <Header>Header</Header>
        )
    }
}

H.contextTypes = {
	siderToggled: PropTypes.func,
};

const mapStateToProps = ({ data, user }) => {
	return {
		data, user
	};
};

export default connect(mapStateToProps)(H);