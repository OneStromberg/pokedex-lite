import React, {PureComponent, Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { List, Spin, Progress, Card, Row, Col, Button } from 'antd';
import Flexbox from 'flexbox-react';

import data from './../../actions/data';
import user from './../../actions/user';
import { capitalizeFirstLetter } from './../../utils/strings';

const Stats = ({ data }) => {
    return (<Card>
        <h4>Stats</h4>
        {data.map(({ stat: { name }, effort, base_stat }) => {
            return (
                <div key={name}>
                    <div>
                        <b>{name}: </b>
                        <i>{base_stat}</i>
                        <Progress percent={(base_stat / 195) * 100} showInfo={false}/>
                    </div>
                </div>
            )
        })}
    </Card>)
}

const Info = ({ data, onClick }) => {
    if (!data) {
        return <Spin />
    }

    const { height, weight, stats, sprites, name } = data

    return (<Row onClick={onClick}>
        <Flexbox alignItems="center" flexDirection="column">
            <img src={sprites['front_default']} alt={name} />
            <p>height: { height }</p>
            <p>weight: { weight }</p>
        </Flexbox>
        <Stats data={ stats }/>
    </Row>)
}

class PokeItem extends Component {
    constructor(){
        super();
        this.state = {
            expanded: false
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.location.pathname != this.props.location.pathname){
            this.setState({
                expanded: false
            })
        }
    }
    onClick = () => {
        const { expanded } = this.state;
        if (!expanded) {
            const { name } = this.props;
            data.loadPoke(name);
            this.setState({
                expanded: true
            })
        } else {
            this.setState({
                expanded: false
            })
        }
    }
    render() {
        const { name, pokes, savedPokes } = this.props;
        const { expanded } = this.state;
        const saved = savedPokes.indexOf(name) !== -1;
        return (
            <List.Item>
                <Row>
                    <Col xs={{ span: 18, offset: 3 }} onClick={this.onClick}><h3>{capitalizeFirstLetter(name)}</h3></Col>
                    <Col xs={{ span: 3}}>
                        <Button onClick={() => user.savePoke(name)} shape="circle" icon={saved ? "heart" : "heart-o"} />
                    </Col>
                </Row>
                {expanded && <Info onClick={this.onClick} data={ pokes[name] || null }/>}
            </List.Item>
        )
    }
}

const mapStateToProps = ({data: { pokes }, user: { savedPokes }}) => {
    return { user, pokes, savedPokes };
};

export default withRouter(connect(mapStateToProps)(PokeItem));