import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Flexbox from 'flexbox-react';
import { Col, Layout, Menu, Progress, Row, Icon, Button } from 'antd';

const { Header } = Layout;

class H extends PureComponent {
    render() {
        const { savedPokes, total } = this.props;
        return (
            <Header>
                <Flexbox justifyContent="space-around">
                    <Link to="/all">All: { total }</Link>
                    <Link to="/saved">Saved: { savedPokes.length }</Link>
                </Flexbox>
            </Header>
        )
    }
}

H.contextTypes = {
	siderToggled: PropTypes.func,
};

const mapStateToProps = ({ data: { total }, user: { savedPokes } }) => {
	return {
		savedPokes, total
	};
};

export default connect(mapStateToProps)(H);