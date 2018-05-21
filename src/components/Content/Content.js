import React, { PureComponent } from 'react';
import { List, message, Spin } from 'antd';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import Item from './../PokeItem';
import * as data from './../../actions/data';

const { Content } = Layout;
const ITEM_HEIGHT = 50;

class ContentWrapper extends PureComponent {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: false,
            hasMore: true
        }
    }
    componentDidMount() {
        const { loadPokeList } = this.props;
        window.addEventListener('resize', this.handleInfiniteOnLoad);
        loadPokeList(this.getNumInColumn());
    }
    getNumInColumn = () => {
        return parseInt(window.innerHeight / ITEM_HEIGHT) + 1;
    }
    handleInfiniteOnLoad = () => {
        let { list, total } = this.props;
        this.setState({loading: true});
        if (list.length >= total) {
            message.warning('Infinite List loaded all');
            this.setState({ hasMore: false });
            return;
        }
        const { loadPokeList } = this.props;
        loadPokeList(this.getNumInColumn());
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

const mapStateToProps = ({ data: { list, total }, user: { savedPokes } }) => {
	return {
		list, total, savedPokes
	};
};

const mapDispatchToProps = dispatch => {
    return { 
        loadPokeList: (name) => dispatch(data.loadPokeList(name))
     }
}

const ContentWrapperConnected = connect(mapStateToProps, mapDispatchToProps)(ContentWrapper);

const ContentRouter = ({ list, total }) => {
    return (
        <Switch>
            <Route exact path="/saved" render={() => <ContentWrapperConnected />}/>
            <Route path="*" render={() => <ContentWrapperConnected />}/>
        </Switch>
    )
}

export default withRouter(ContentRouter);