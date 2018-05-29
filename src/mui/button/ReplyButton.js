import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import FlatButton from 'material-ui/FlatButton';


import ContentCreate from 'material-ui/svg-icons/content/reply';

const ReplyButton = ({basePath = '', record = {}, linkreference = '', resource = ''}) =>
    <FlatButton primary label="Reply" containerElement={<Link
        to={ linkreference ? `/${resource}/${record.id}` : `${basePath}/${record.id}/reply`}/>} icon={<ContentCreate />}/>;

ReplyButton.propTypes = {
    basePath: PropTypes.string,
    record: PropTypes.object,
    resource: PropTypes.string,
    linkreference: PropTypes.bool,
};

export default ReplyButton;
