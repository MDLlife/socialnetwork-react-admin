import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';
import Notification from './Notification';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Menu from './Menu';
import {crudAutoLogin} from '../../actions/dataActions';
import auth from '../../auth'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {fade} from 'material-ui/utils/colorManipulator';
import FlatButton from 'material-ui/FlatButton';

injectTapEventPlugin();

import {
    cyan500, cyan700,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
    datePicker: {
        selectColor: "#166e66"
    },
    fontFamily: 'Open Sans, sans-serif',
    palette: {
        primary1Color: "#166e66",
        primary2Color: cyan700,
        primary3Color: grey400,
        accent1Color: "#d75c59",
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
    appBar: {
        height: 50,
    }
});

const Layout = ({isLoading, children, route, myuser}) => (
    <MuiThemeProvider  muiTheme={muiTheme}>
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <AppBar title={<Link to="/" style={{color: '#fff', textDecoration: 'none', float: 'left', fontSize: '16px'}}> M D L  - ADMIN</Link>}
                    iconElementRight={isLoading ? <CircularProgress color="#fff" size={0.5}/> : <Link to="/logout" style={{color: '#fff'}}>  Welcome back {myuser.username} ! <FlatButton className="logout-button"  label="Log out" /> </Link>}/>
            <div className="body" style={{display: 'flex', flex: '1', backgroundColor: '#edecec'}}>
                <div style={{flex: 1}}>{children}</div>
                <Menu resources={route.resources}/>
            </div>
            <Notification />
        </div>
    </MuiThemeProvider>
);

Layout.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.node,
    route: PropTypes.object.isRequired,
    myuser: PropTypes.any.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.admin.loading > 0,
        myuser: auth.getUser()
    };
}

export default connect(
    mapStateToProps,
)(Layout);
