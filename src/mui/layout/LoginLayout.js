import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import auth from '../../auth'

class LoginLayout extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }

        var session = vars["session"];
        var token = vars["jv_jwt"];

        if (!auth.loggedIn) {
            console.log("Not logged in :|")
            return <div>You are not logged In :| </div>
        } else if (token) {

            auth.login(token).then(function () {
                if (auth.loggedIn) {
                    console.log("LoginLayout, You are now Logged In :D, ", auth.getUser())
                    window.location.href = "/";
                } else {
                    console.log("LoginLayout, Not logged in again :|")
                }
            })
        } else {

            var targetprefix = "";
            if (document.location.hostname.indexOf("localhost") !== -1) {
                targetprefix = "http://localhost:3000"
            } else {
                targetprefix = "https://api.mdl.live"
            }
            window.location.href = targetprefix + "/login";

        }

        return <Card style={{margin: '2em'}}>
            <CardHeader title="Login Page"/>
            <CardText>Loading ... </CardText>
        </Card>
    }
}

LoginLayout.propTypes = {
    // isLoading: PropTypes.bool.isRequired,
    children: PropTypes.node,
    route: PropTypes.object.isRequired,
};

export default connect(
    state => ({
    }),
)(LoginLayout);
