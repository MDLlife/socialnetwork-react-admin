import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import auth from '../../auth'

class LoginLayout extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var targetprefix = "";
        if (document.location.hostname.indexOf("localhost") !== -1) {
            targetprefix = "http://localhost:3000"
        } else {
            targetprefix = "https://api.comentarismo.com"
        }
        window.location.href = targetprefix + "/logout";

        return <Card style={{margin: '2em'}}>
            <CardHeader title="Login Page"/>
            <CardText>Loading ... </CardText>
        </Card>
    }
}

LoginLayout.propTypes = {
    children: PropTypes.node,
    route: PropTypes.object.isRequired,
};

export default connect(
    state => ({}),
)(LoginLayout);
