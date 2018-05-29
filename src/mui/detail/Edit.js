import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Card, CardHeader, CardTitle, CardActions} from 'material-ui/Card';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import inflection from 'inflection';
import InputList from './InputList';
import Title from '../layout/Title';
import {ListButton, DeleteButton, SaveButton, SpamButton, ReplyButton, ModerateButton, EditButton} from '../button';
import {crudGetOne as crudGetOneAction, crudUpdate as crudUpdateAction} from '../../actions/dataActions';
import auth from '../../auth';

import PersonIcon from 'material-ui/svg-icons/social/person';
import
    DateField
    from '../input/DateInput';

class Edit extends Component {
    constructor(props) {
        console.log("Edit constructor, ", props)
        super(props);
        this.state = {record: props.data};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.crudGetOne(this.props.resource, this.props.id, this.getBasePath());
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({record: nextProps.data});
        }else if(nextProps.data){
            this.setState({record: nextProps.data});
        }else if(this.props.data){
            this.setState({record: this.props.data});

            
        }
        if (nextProps && nextProps.data) {

            var user = auth.getUser();
            
            if (!nextProps.data['visit'] || !nextProps.data['visit'].contains(user.id)) {
                console.log ("user has not seen the comment, check in database")
                const request = new XMLHttpRequest();

                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {

                    }
                };
                var targetprefix = "";
                if (document.location.hostname.indexOf("localhost") !== -1) {
                    targetprefix = "http://localhost:3000"
                } else {
                    targetprefix = "https://api.comentarismo.com"
                }

                request.open('POST', targetprefix + '/visit/' + this.props.resource + "/" + this.props.id + "/", true);
                request.withCredentials = true;
                request.send();

            } 
        } 
        if (this.props.id !== nextProps.id) {
            this.props.crudGetOne(nextProps.resource, nextProps.id, this.getBasePath());
        }
    }

    // FIXME Seems that the cloneElement in CrudRoute slices the children array, which makes this necessary to avoid rerenders
    shouldComponentUpdate(nextProps) {
        return nextProps.isLoading !== this.props.isLoading
            || nextProps.children.every((child, index) => child === this.props.children[index]);
    }

    getBasePath() {
        const {location} = this.props;
        return location.pathname.split('/').slice(0, -1).join('/');
    }

    handleChange(key, value) {
        this.setState({record: {...this.state.record, [key]: value}});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.crudUpdate(this.props.resource, this.props.id, this.state.record, this.getBasePath());
    }

    render() {
        const {
            title, children, id, data, isLoading, resource,
            hasDelete, hasSpam, hasReply, hasModerate, hasEdit, hasList, hasSave
        } = this.props;
        const basePath = this.getBasePath();
        return (
            <Card style={{margin: '2em', opacity: isLoading ? .8 : 1, overflow: 'auto'}}>
                <CardActions style={{zIndex: 2, display: 'inline-block', float: 'right'}}>
                    {hasList && <ListButton basePath={basePath}/> }
                    {hasDelete && <DeleteButton basePath={basePath} record={data}/>}

                    {hasSpam && <SpamButton basePath={basePath} record={data}/>}
                    {hasReply && <ReplyButton basePath={basePath} record={data}/>}
                    {hasModerate && <ModerateButton basePath={basePath} record={data}/>}
                    {hasEdit &&
                    <EditButton linkreference={true} resource={resource} basePath={basePath} record={data}/>}


                </CardActions>
                <CardTitle title={<Title title={title} record={data}
                                         defaultTitle={`${inflection.humanize(inflection.singularize(resource))}`}/>}/>
                <form onSubmit={this.handleSubmit}>
                    <div style={{padding: '0 1em 1em 1em'}}>
                        <InputList
                            record={this.state.record}
                            inputs={children} style={{display: 'inline-block'}}
                            resource={resource}
                            handleChange={this.handleChange}
                            basePath={basePath}/>
                        {
                            this.state.record && this.state.record.replies && this.state.record.replies.map(
                                function (reply, i) {
                                    return (
                                        <Card style={{margin: '15px 0', width:'90%', float: 'right'}}>
                                            <CardHeader style={{fontSize: '1rem'}}
                                                        title={reply.nick ? reply.nick : <label>Anonymus</label>}
                                                        subtitle={<DateField source='updatedAt' record={reply} options={{disabled:"true"}} />}
                                                        avatar={reply.avatarurl ? reply.avatarurl : <PersonIcon  key={reply.id}/>  }/>
                                            <ul style={{padding: '0px 15px', position: 'relative', top: '-15px', fontSize: '1rem' }}>{reply.comment}</ul>
                                        </Card>
                                    )
                                })
                        }
                        { hasSave &&
                            <Toolbar>
                                <ToolbarGroup>
                                     <SaveButton />
                                </ToolbarGroup>
                            </Toolbar>
                        }
                    </div>
                </form>
            </Card>
        );
    }
}

Edit.propTypes = {
    title: PropTypes.any,
    id: PropTypes.string.isRequired,
    resource: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    hasDelete: PropTypes.bool.isRequired,
    hasSpam: PropTypes.bool.isRequired,
    hasReply: PropTypes.bool.isRequired,
    hasModerate: PropTypes.bool.isRequired,
    hasSave: PropTypes.bool.isRequired,
    hasList: PropTypes.bool.isRequired,
    hasEdit: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    data: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    crudGetOne: PropTypes.func.isRequired,
    crudUpdate: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
    return {
        id: props.params.id,
        data: state.admin[props.resource].data[props.params.id],
        isLoading: state.admin.loading > 0,
    };
}

export default connect(
    mapStateToProps,
    {crudGetOne: crudGetOneAction, crudUpdate: crudUpdateAction},
)(Edit);
