import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import FlatButton from 'material-ui/FlatButton';


import ContentCreate from 'material-ui/svg-icons/content/remove';

const SpamButton = ({basePath = '', record = {}, linkreference = '', resource = ''}) =>
    <FlatButton primary label="Spam" containerElement={<Link
        to={ linkreference ? `/${resource}/${record.id}` : `${basePath}/${record.id}/spam`}/>} icon={<ContentCreate />}/>;

SpamButton.propTypes = {
    basePath: PropTypes.string,
    record: PropTypes.object,
    resource: PropTypes.string,
    linkreference: PropTypes.bool,
};

export default SpamButton;
