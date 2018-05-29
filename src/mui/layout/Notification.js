import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { hideNotification as hideNotificationAction } from '../../actions/notificationActions' ;

class Notification extends React.Component {
    handleRequestClose = () => {
        this.props.hideNotification();
    };

    render() {
        const style = {};
        if (this.props.type === 'warning') {
            style.backgroundColor = '#9B4240';
        }
        if (this.props.type === 'confirm') {
            style.backgroundColor = '#166E66';
        }
        return (<Snackbar
            open={!!this.props.message}
            message={this.props.message}
            autoHideDuration={4000}
            onRequestClose={::this.handleRequestClose}
            bodyStyle={style}
        />);
    }
}

Notification.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string.isRequired,
    hideNotification: PropTypes.func.isRequired,
};

Notification.defaultProps = {
    type: 'info',
};

const mapStateToProps = (state) => ({
    message: state.admin.notification.text,
    type: state.admin.notification.type,
});

export default connect(
  mapStateToProps,
  { hideNotification: hideNotificationAction },
)(Notification);
