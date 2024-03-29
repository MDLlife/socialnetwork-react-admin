import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';

const EMPTY_STRING = '';

class TextInput extends Component {
    handleChange(event) {
        this.props.onChange(this.props.source, this.props.source2, event.target.value);
    }

    render() {
        const {source, source2, label, record, options} = this.props;
        return (<TextField
            name={source}
            floatingLabelText={label}
            value={record[source] ? record[source][source2] : EMPTY_STRING || EMPTY_STRING}
            onChange={::this.handleChange}
            {...options}
        />);
    }
}

TextInput.propTypes = {
    source: PropTypes.string.isRequired,
    source2: PropTypes.string.isRequired,
    label: PropTypes.string,
    record: PropTypes.object,
    options: PropTypes.object,
    onChange: PropTypes.func,
};

TextInput.defaultProps = {
    record: {},
    options: {},
};

export default TextInput;
