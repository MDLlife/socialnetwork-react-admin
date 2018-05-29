import React, { Component, PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';

const EMPTY_STRING = false;
class CheckboxInput extends Component {
    onCheck (event, checked) {
        this.props.onChange(this.props.source, checked);
    }

    render() {
        const { source, label, record, options } = this.props;
        return (<Checkbox
            name={source}
            label={label}
            checked={record[source] || EMPTY_STRING}
            onCheck={this.onCheck.bind(this)}
            {...options}
        />);
    }
}

CheckboxInput.propTypes = {
    source: PropTypes.string.isRequired,
    label: PropTypes.string,
    record: PropTypes.object,
    options: PropTypes.object,
    onChange: PropTypes.func,
};

CheckboxInput.defaultProps = {
    record: {},
    options: {},
};

export default CheckboxInput;
