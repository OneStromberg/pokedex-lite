import React, { PureComponent } from 'react';
import { List, message, Avatar, Spin } from 'antd';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import data from './../../actions/data';

const { Content } = Layout;

const Item = (name) => {
    return (<List.Item>
      <div>{name}</div>
    </List.Item>)
}

class C extends PureComponent {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: false,
            hasMore: true
        }
    }
    componentDidMount() {
        data.loadPoke(20);
    }
    handleInfiniteOnLoad = () => {
        let { list, total } = this.props;
        this.setState({loading: true});
        if (list.length >= total) {
            message.warning('Infinite List loaded all');
            this.setState({ hasMore: false });
            return;
        }
        data.loadPoke(20);
    }
    render() {
        const { list } = this.props;
        return (
            <Content>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={this.state.hasMore}
                    useWindow={true}>
                    <List dataSource={list} renderItem={Item}>
                        {this.state.loading && this.state.hasMore && (
                            <div className="demo-loading-container">
                                <Spin/>
                            </div>
                        )}
                    </List>
                </InfiniteScroll>
            </Content>
        );
    }
}

const mapStateToProps = ({ data: { list, total }, user }) => {
	return {
		list, total
	};
};

export default connect(mapStateToProps)(C);