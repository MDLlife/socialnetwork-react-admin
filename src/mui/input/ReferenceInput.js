import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { crudGetOne as crudGetOneAction, crudGetMatching as crudGetMatchingAction, crudGetDistinct as crudGetDistinctAction } from '../../actions/dataActions';
import AutoComplete from 'material-ui/AutoComplete';

export class ReferenceInput extends Component {
    componentDidMount() {
        const { reference, record, source, resource } = this.props;
        // console.log("ReferenceInput, componentDidMount, fetchReferenceAndOptions");
        // console.log("ReferenceInput, reference,", reference, " ,record,", record, " ,source,", source, " ,resource,", resource);
        this.fetchReferenceAndOptions(reference, source, resource);
    }

    componentWillReceiveProps(nextProps) {
        // console.log("ReferenceInput, componentWillReceiveProps,", nextProps);
        if (this.props.record.id !== nextProps.record.id) {
            const { reference, record, source, resource } = nextProps;
            // console.log("ReferenceInput, componentWillReceiveProps, fetchReferenceAndOptions");
            this.fetchReferenceAndOptions(reference, source, resource);
        } else {
            // console.log("ReferenceInput, componentWillReceiveProps, else");
        }
    }

    fetchReferenceAndOptions(reference, id, relatedTo) {
        if (id) {
            console.log("ReferenceInput, fetchReferenceAndOptions, if(id)", reference, relatedTo, id);
            this.props.crudGetDistinct(reference, relatedTo, id);
        } else {
            console.log("ReferenceInput, fetchReferenceAndOptions else", reference, relatedTo, {});
            this.props.crudGetDistinct(reference, relatedTo, {});
        }
    }

    handleChange(event, key, payload) {
        console.log("ReferenceInput, handleChange, ",event, key, payload);
        console.log("onChange()",this.props.reference,this.props.source, event);
        this.props.onChange(this.props.source, event);
    }

    onChange(event, key, payload){
        console.log("ReferenceInput, onChange, ",event, key, payload);
    }

    onUpdateInput(inputValue){
        console.log("onUpdateInput, ", inputValue)
    }

    render() {
        const { record, label, source, referenceRecord, referenceSource, allowEmpty, matchingReferences, options } = this.props;
        // console.log("ReferenceInput, record,", record, " ,label,", label, " ,source,", source, " ,referenceRecord,", referenceRecord, " ,referenceSource,", referenceSource, " ,allowEmpty,", allowEmpty, " ,matchingReferences,", matchingReferences, " ,options, ", options)


        if (!referenceRecord && !allowEmpty) {
            return <TextField floatingLabelText={label}/>;
        }

        var ds = [];
        if(matchingReferences){
            ds = matchingReferences.map(function(v){
                // console.log("ReferenceInput, adding match -> ",v);
                return v[source];
            })
        }
        console.log("ReferenceInput, ds, ",ds.length);

        return (
            <AutoComplete
                floatingLabelText="Type anything, case insensitive"
                filter={AutoComplete.caseInsensitiveFilter}
                onNewRequest={::this.handleChange}
                onChange={::this.onChange}
                onUpdateInput={::this.onUpdateInput}
                dataSource={ds}
                openOnFocus={true}
                maxSearchResults={10}
            />
        );
    }
}
//<SelectField menuStyle={{ maxHeight: '41px', overflowY: 'hidden' }} floatingLabelText={label} value={record[source]} onChange={::this.handleChange} autoWidth {...options} >
//    {matchingReferences.map(reference =>
//        <MenuItem key={reference.id} value={reference.id} primaryText={reference[referenceSource]} />
//    )}
//</SelectField>

ReferenceInput.propTypes = {
    resource: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    label: PropTypes.string,
    record: PropTypes.object,
    matchingReferences: PropTypes.array,
    allowEmpty: PropTypes.bool.isRequired,
    reference: PropTypes.string.isRequired,
    referenceSource: PropTypes.string.isRequired,
    referenceRecord: PropTypes.object,
    options: PropTypes.object,
    onChange: PropTypes.func,
    crudGetOne: PropTypes.func.isRequired,
    crudGetMatching: PropTypes.func.isRequired,
    crudGetDistinct: PropTypes.func.isRequired,
};

ReferenceInput.defaultProps = {
    referenceRecord: null,
    record: {},
    allowEmpty: false,
    matchingReferences: [],
};

function mapStateToProps(state, props) {
    const {reference,source,resource,record } = props;
    // console.log("ReferenceInput mapStateToProps, ", state, " ,reference,",reference," ,source,",source, " ,resource,",resource," ,record,",record);

    const referenceId = record[source];
    // console.log("ReferenceInput -> mapStateToProps, referenceId, record, source, ",referenceId, record, source);
    const matchingIds = state.admin[resource].detail[reference] || [];
    // console.log("ReferenceInput -> mapStateToProps, matchingIds, state.admin[resource], resource, reference ",state.admin[resource],resource,reference);
    // console.log("ReferenceInput -> mapStateToProps, matchingIds, ", matchingIds);

    if (referenceId && !matchingIds.includes(referenceId)) {
        matchingIds.unshift(referenceId);
    }
    return {
        referenceRecord: state.admin[reference].data[referenceId],
        matchingReferences: matchingIds.map(id => state.admin[reference].data[id]).filter(r => typeof r !== 'undefined'),
    };
}

export default connect(mapStateToProps, {
    crudGetOne: crudGetOneAction,
    crudGetMatching: crudGetMatchingAction,
    crudGetDistinct: crudGetDistinctAction,
})(ReferenceInput);
