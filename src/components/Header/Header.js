import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Flexbox from 'flexbox-react';
import { Layout } from 'antd';

const { Header } = Layout;

class H extends PureComponent {
    render() {
        const { savedPokes, total } = this.props;
        return (
            <Header>
                <Flexbox justifyContent="space-around">
                    <Link to="/all">All: { total || 0 }</Link>
                    <Link to="/saved">Saved: { savedPokes && savedPokes.length || 0 }</Link>
                </Flexbox>
            </Header>
        )
    }
}

const mapStateToProps = ({ data: { total }, user: { savedPokes } }) => {
	return {
		savedPokes, total
	};
};

export default connect(mapStateToProps)(H);