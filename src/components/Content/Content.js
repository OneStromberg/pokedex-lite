import React, { PureComponent } from 'react';
import { List, message, Avatar, Spin } from 'antd';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import Item from './../PokeItem';
import data from './../../actions/data';

const { Content } = Layout;

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
        data.loadPokeList(20);
    }
    handleInfiniteOnLoad = () => {
        let { list, total } = this.props;
        this.setState({loading: true});
        if (list.length >= total) {
            message.warning('Infinite List loaded all');
            this.setState({ hasMore: false });
            return;
        }
        data.loadPokeList(20);
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
                    <List dataSource={list} renderItem={name => <Item name={name} /> }>
                        {this.state.loading && this.state.hasMore && (
                            <Spin/>
                        )}
                    </List>
                </InfiniteScroll>
            </Content>
        );
    }
}

const mapStateToProps = ({ data: { list, total }, user: { searchValue } }) => {
	return {
		list, total
	};
};

export default connect(mapStateToProps)(C);