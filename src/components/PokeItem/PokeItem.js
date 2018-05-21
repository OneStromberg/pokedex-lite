import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { List, Spin, Progress, Card, Row, Col, Button } from 'antd';
import Flexbox from 'flexbox-react';

import * as data from './../../actions/data';
import * as user from './../../actions/user';
import { capitalizeFirstLetter } from './../../utils/strings';

const BASE_STAT = 195;

const Stats = ({ data }) => {
    return (<Card>
        <h4>Stats</h4>
        {data.map(({ stat: { name }, effort, base_stat }) => {
            return (
                <div key={name}>
                    <div>
                        <b>{name}: </b>
                        <i>{base_stat}</i>
                        <Progress percent={(base_stat / BASE_STAT) * 100} showInfo={false}/>
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

class PokeItem extends PureComponent {
    constructor(){
        super();
        this.state = {
            expanded: false
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.location.pathname !== this.props.location.pathname){
            this.setState({
                expanded: false
            })
        }
    }
    onClick = () => {
        const { expanded } = this.state;
        if (!expanded) {
            const { name, loadPoke } = this.props;
            loadPoke(name);
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
        const { name, pokes, savedPokes, savePoke } = this.props;
        const { expanded } = this.state;
        const saved = savedPokes && savedPokes.indexOf(name) !== -1;
        return (
            <Row>
                <List.Item>
                    <Row>
                        <Col xs={{ span: 18, offset: 3 }} onClick={this.onClick}><h3>{capitalizeFirstLetter(name)}</h3></Col>
                        <Col xs={{ span: 3}}>
                            <Button onClick={() => savePoke(name)} shape="circle" icon={saved ? "heart" : "heart-o"} />
                        </Col>
                    </Row>
                </List.Item>
                {expanded && <Info onClick={this.onClick} data={ pokes && pokes[name] || null }/>}
            </Row>
        )
    }
}

const mapStateToProps = ({data: { pokes }, user: { savedPokes }}) => {
    return { user, pokes, savedPokes };
};

const mapDispatchToProps = dispatch => {
    return { 
        loadPoke: (name) => dispatch(data.loadPoke(name)),
        savePoke: (name) => dispatch(user.savePoke(name))
     }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PokeItem));