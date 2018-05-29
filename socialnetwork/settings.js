import {Card, CardHeader, CardText} from 'material-ui/Card';
import {connect} from 'react-redux';
import {action} from 'redux-saga';

import React, {Component, PropTypes} from 'react';

import auth from '../src/auth'

const Panel = ({myuser}) =>
    <div>
        <div>User logged is {myuser.username} </div>
    </div>;

Panel.propTypes = {
    myuser: PropTypes.any.isRequired
};


export const UserPanel = connect(
    state => ({
        myuser: auth.getUser(),
    })
)(Panel);


class Settings extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {

        return <Card style={{margin: '2em'}}>
            <CardHeader title="Settings page"/>
            <CardText>TODO: get some settings here...<UserPanel /></CardText>

        </Card>
    }
}


Settings.propTypes = {
    title: PropTypes.any,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    data: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state, props) {
    // console.log("mapStateToProps, state, ", state)
    // console.log("mapStateToProps, props, ", props)

    if (state.admin.loading > 0) {
        // console.log("loading")
    }else {
        // console.log("not loading")
    }

    return {
        isLoading: state.admin.loading > 0,
    };
}

export default connect(
    mapStateToProps,
)(Settings);