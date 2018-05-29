import React, { PropTypes } from 'react';

const TitleField = ({ source = "", record = {}, floatingLabelText = "" }) => <h4 className="titleField"> {floatingLabelText} {record[source]}</h4>;

TitleField.propTypes = {
    source: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object,
    floatingLabelText: PropTypes.string,
};

export default TitleField;
