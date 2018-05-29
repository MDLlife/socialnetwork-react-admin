import React, {PropTypes} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import ContentSort from 'material-ui/svg-icons/content/sort';

import Toggle from 'material-ui/Toggle';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import _ from "underscore";

import {
    ReferenceInput,
    List,
    EmbededList,
    Filter,
    Edit,
    Create,
    DateField,
    TextField,
    EditButton,
    SpamButton,
    DisabledInput,
    TextInput,
    LongTextInput,
    DateInput
} from 'admin-on-rest/mui';

const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};

const CustomDialog = (props) => (<Dialog
    title="Quick View"
    actions={[
        <FlatButton
            label="CLOSE"
            primary={true}
            keyboardFocused={true}
            onTouchTap={props.handleClose}
        />,
    ]}
    modal={false}
    open={props.open}
    onRequestClose={props.handleClose}
    autoScrollBodyContent={true}>

    <CustomEdit {...props} />

</Dialog>);

CustomDialog.propTypes = {
    record: PropTypes.object.isRequired,
    resource:  PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    id:PropTypes.string.isRequired,
    basePath:PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
};

const CommentEdit = (props) => (
    <Edit {...props} hasEdit={true}>
        <TextField label="Nick" source="nick" />
        <DateInput label="Date" source="date" />
        <LongTextInput label="Comment" source="comment" />
    </Edit>
);

class CustomEdit extends React.Component {
    constructor(props) {
        // console.log("CustomEdit, ", props);
        super(props);
    }

    render() {

        var clonedprops = _.clone(this.props);
        clonedprops.params = {};
        clonedprops.params.id = this.props.id;

        return (<div>
            <CommentEdit {...clonedprops} />
        </div>)
    }
}
CustomEdit.propTypes = {
    record: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    id:PropTypes.string.isRequired,
    basePath:PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
};


class Datagrid extends React.Component {

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleChange = (event) => {
        this.setState({height: event.target.value});
    };

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            openedit: [],
            fixedHeader: false,
            fixedFooter: false,
            stripedRows: false,
            showRowHover: false,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: true,
            height: 'auto',
            id: "",
        };
    }

    handleOpenEdit = (event) => {
        // console.log("Open event, ",event);
        var openedit = [];
        openedit[event.currentTarget._key] = true;
        this.setState({openedit:openedit});
    };

    handleCloseEdit = () => {
        this.setState({openedit: false});
    };

    render () {

        var {fields, ids, data, currentSort, basePath, updateSort, resource,location, quickedit} = this.props;

        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (<div>
            <Dialog
                title="Settings"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}
            >
                <div style={styles.propContainer}>
                    <h3>Table Properties</h3>
                    <TextField
                        floatingLabelText="Table Body Height"
                        defaultValue={this.state.height}
                        onChange={this.handleChange}
                    />
                    <Toggle
                        name="fixedHeader"
                        label="Fixed Header"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.fixedHeader}
                    />
                    <Toggle
                        name="fixedFooter"
                        label="Fixed Footer"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.fixedFooter}
                    />
                    <Toggle
                        name="selectable"
                        label="Selectable"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.selectable}
                    />
                    <Toggle
                        name="multiSelectable"
                        label="Multi-Selectable"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.multiSelectable}
                    />
                    <Toggle
                        name="enableSelectAll"
                        label="Enable Select All"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.enableSelectAll}
                    />
                    <h3 style={styles.propToggleHeader}>TableBody Properties</h3>
                    <Toggle
                        name="deselectOnClickaway"
                        label="Deselect On Clickaway"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.deselectOnClickaway}
                    />
                    <Toggle
                        name="stripedRows"
                        label="Stripe Rows"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.stripedRows}
                    />
                    <Toggle
                        name="showRowHover"
                        label="Show Row Hover"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.showRowHover}
                    />
                    <h3 style={styles.propToggleHeader}>Multiple Properties</h3>
                    <Toggle
                        name="showCheckboxes"
                        label="Show Checkboxes"
                        onToggle={this.handleToggle}
                        defaultToggled={this.state.showCheckboxes}
                    />
                </div>
            </Dialog>
            <Table height={this.state.height}
                   fixedHeader={this.state.fixedHeader}
                   fixedFooter={this.state.fixedFooter}
                   selectable={this.state.selectable}
                   multiSelectable={this.state.multiSelectable}>
                <TableHeader>
                    <TableRow >
                        {fields.map(field => (
                            <TableHeaderColumn key={field.props.label || 'no-key'}>
                                {field.props.label &&
                                <FlatButton
                                    labelPosition="before"
                                    onClick={updateSort}
                                    data-sort={field.props.source}
                                    label={field.props.label}
                                    icon={field.props.source === currentSort.sort ? <ContentSort
                                        style={currentSort.order === 'ASC' ? {transform: 'rotate(180deg)'} : {}}/> : false}
                                />
                                }
                            </TableHeaderColumn>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody showRowHover>
                    {ids.map(id => (
                        <TableRow style={ data && data[id] && data[id].visit ? {fontWeight: 'normal'} : {fontWeight: 'bold'}  } key={id}>
                            {fields.map(field => (
                                <TableRowColumn key={`${id}-${field.props.source}`} >
                                    <field.type {...field.props} record={data[id]} basePath={basePath} id={id}/>
                                </TableRowColumn>
                            ))}
                            {quickedit && <RaisedButton id={id} key={id} label="View" onTouchTap={this.handleOpenEdit}/> }
                            {quickedit && <CustomDialog location={location} handleClose={this.handleCloseEdit} basePath={basePath} open={this.state.openedit[id] || false} record={data[id]} id={id} resource={resource} />}

                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>)
    }

}
// <RaisedButton label="Settings" onTouchTap={this.handleOpen} />

Datagrid.propTypes = {
    resource: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    data: PropTypes.object.isRequired,
    currentSort: PropTypes.shape({
        sort: PropTypes.string,
        order: PropTypes.string,
    }),
    basePath: PropTypes.string,
    updateSort: PropTypes.func,
    quickedit:PropTypes.bool,
};

export default Datagrid;
