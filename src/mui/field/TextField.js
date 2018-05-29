import React, { PropTypes } from 'react';

const TextField = ({ source = "", record = {}, floatingLabelText = "" }) => <span>  {floatingLabelText} {record[source]}</span>;

TextField.propTypes = {
    source: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object,
    floatingLabelText: PropTypes.string,
};

export default TextField;
