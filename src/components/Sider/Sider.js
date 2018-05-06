import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { connect } from 'react-redux';

const { Sider } = Layout;

class S extends PureComponent {
	render() {
        const { collapsed } = this.props;
        const { siderToggled } = this.context;
		return (
            <Sider
                className="Sider"
                trigger={null}
                collapsed={collapsed}
                defaultCollapsed={true}
                collapsible
                collapsedWidth="0"
                onCollapse={(collapsed, type) => siderToggled({ collapsed, type })}
            >
                Sider
            </Sider>
		);
	}
}

S.contextTypes = {
	siderToggled: PropTypes.func,
};

const mapStateToProps = ({ data, user }) => {
	return {
		data, user
	};
};

export default connect(mapStateToProps)(S);