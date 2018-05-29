import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import ContentCreate from 'material-ui/svg-icons/content/create';

const EditButton = ({basePath = '', record = {}, linkreference = '', resource = ''}) =>
    <FlatButton primary label="Edit" containerElement={<Link
        to={ linkreference ? `/${resource}/${record.id}` : `${basePath}/${record.id}`}/>} icon={<ContentCreate />}/>;

EditButton.propTypes = {
    basePath: PropTypes.string,
    record: PropTypes.object,
    resource: PropTypes.string,
    linkreference: PropTypes.bool,
};

export default EditButton;
