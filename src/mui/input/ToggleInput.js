import React, {Component, PropTypes} from 'react';
import Toggle from 'material-ui/Toggle';

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};

const EMPTY_STRING = false;
class ToggleInput extends Component {
    onCheck (event, checked) {
        this.props.onChange(this.props.source, checked);
    }

    render() {
        const {source, label, record, options} = this.props;
        return (<Toggle
            name={source}
            label={label}
            toggled={Boolean(record[source] || EMPTY_STRING)}
            labelPosition="right"
            onToggle={::this.onCheck}
            style={styles.checkbox}
            {...options}
        />);
    }
}

ToggleInput.propTypes = {
    source: PropTypes.string.isRequired,
    label: PropTypes.string,
    record: PropTypes.object,
    options: PropTypes.object,
    onChange: PropTypes.func,
};

ToggleInput.defaultProps = {
    record: {},
    options: {},
};

export default ToggleInput;
