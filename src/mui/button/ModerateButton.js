import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import FlatButton from 'material-ui/FlatButton';


import ContentCreate from 'material-ui/svg-icons/content/report';

const ModerateButton = ({basePath = '', record = {}, linkreference = '', resource = ''}) =>
    <FlatButton primary label="Moderate" containerElement={<Link
        to={ linkreference ? `/${resource}/${record.id}` : `${basePath}/${record.id}/moderate`}/>} icon={<ContentCreate />}/>;

ModerateButton.propTypes = {
    basePath: PropTypes.string,
    record: PropTypes.object,
    resource: PropTypes.string,
    linkreference: PropTypes.bool,
};

export default ModerateButton;
