import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ContentSave from 'material-ui/svg-icons/content/save';

const SaveButton = () => <RaisedButton
    type="submit"
    label="Save"
    icon={<ContentSave />}
    primary
    className="raised-button--rounded"
    style={{
        margin: '10px 0px',
        position: 'relative',
    }}
/>;

export default SaveButton;
