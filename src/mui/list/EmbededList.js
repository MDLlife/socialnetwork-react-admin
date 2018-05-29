import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push as pushAction} from 'react-router-redux';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import inflection from 'inflection';
import queryReducer, {SET_SORT, SET_PAGE, SET_FILTER} from '../../reducer/resource/list/queryReducer';
import Title from '../layout/Title';
import Datagrid from './Datagrid';
import Pagination from './Pagination';
import CreateButton from '../button/CreateButton';
import {crudGetList as crudGetListAction} from '../../actions/dataActions';
import {changeListParams as changeListParamsAction} from '../../actions/listActions';

class EmbededList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.updateSort = this.updateSort.bind(this);
        this.setPage = this.setPage.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.showFilter = this.showFilter.bind(this);
        this.hideFilter = this.hideFilter.bind(this);
    }

    componentWillMount() {
        var that = this;
        setTimeout(function () {
            const {sort, order, page, perPage, filter} =  that.getQuery();
            that.props.crudGetList(that.props.resource, {page, perPage}, {field: sort, order}, filter);
        }, 100);

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.linkreference && !nextProps.changeParams) {
            // this.updateData();
            // console.log("componentWillReceiveProps, nextProps.resource !== this.props.resource",nextProps.resource !== this.props.resource)
        } else if (nextProps.resource !== this.props.resource
            || nextProps.query.sort !== this.props.query.sort
            || nextProps.query.order !== this.props.query.order
            || nextProps.query.page !== this.props.query.page
            || nextProps.query.filter !== this.props.query.filter) {
            // console.log("EmbededList, List, componentWillReceiveProps, Will re-render ")
            this.updateData(Object.keys(nextProps.query).length > 0 ? nextProps.query : nextProps.params);
        }
        else if (nextProps.linkreference && nextProps.changeParams) {
            // console.log("EmbededList, List, componentWillReceiveProps, else ");
            this.updateData(Object.keys(nextProps.query).length > 0 ? nextProps.query : nextProps.params);
        }
    }

    getBasePath() {
        return this.props.location.pathname;
    }

    refresh(event) {
        event.stopPropagation();
        this.updateData();
    }

    getQuery() {
        return (Object.keys(this.props.query).length > 0) ? this.props.query : {...this.props.params};
    }

    updateData(query) {
        const {sort, order, page, perPage, filter} = query || this.getQuery();
        this.props.crudGetList(this.props.resource, {page, perPage}, {field: sort, order}, filter);
    }

    updateSort(event) {
        event.stopPropagation();
        this.changeParams({type: SET_SORT, payload: event.currentTarget.dataset.sort});
    }

    setPage(page) {
        // console.log("List, setPage, ",page)
        // this.setState({linkreference : false });
        this.changeParams({type: SET_PAGE, payload: page});
    }

    setFilter(field, value) {
        this.changeParams({type: SET_FILTER, payload: {field, value}});
    }

    showFilter(filterName) {
        this.setState({[filterName]: true});
    }

    hideFilter(filterName) {
        this.setState({[filterName]: false});
        this.setFilter(filterName);
    }

    changeParams(action) {
        const newParams = queryReducer(this.getQuery(), action);
        // newParams.linkreference = false;
        newParams.filter.changeParams = true;
        this.props.push({...this.props.location, query: {...newParams, filter: JSON.stringify(newParams.filter)}});
        // this.props.push({ ...this.props, linkreference: false});
        this.props.changeListParams(this.props.resource, newParams);
    }

    render() {
        const {filter, resource, hasCreate, title, data, ids, total, children, isLoading, quickedit} = this.props;
        const query = this.getQuery();
        const filterValues = query.filter;
        const basePath = this.getBasePath();
        return (
            <Card style={{margin: '2em', opacity: isLoading ? .8 : 1}}>
                <CardActions style={{zIndex: 2, display: 'inline-block', float: 'right'}}>
                    {filter && React.createElement(filter, {
                        resource,
                        showFilter: this.showFilter,
                        displayedFilters: this.state,
                        filterValues,
                        context: 'button',
                    })}
                    {hasCreate && <CreateButton basePath={basePath}/>}
                    <FlatButton primary label="Refresh" onClick={::this.refresh} icon={<NavigationRefresh />}/>
                </CardActions>
                <CardTitle title={<Title title={title}
                                         defaultTitle={`${inflection.humanize(inflection.pluralize(resource))} List`}/>}/>
                {filter && React.createElement(filter, {
                    resource,
                    hideFilter: this.hideFilter,
                    setFilter: this.setFilter,
                    filterValues,
                    displayedFilters: this.state,
                    context: 'form',
                })}
                <Datagrid quickedit={quickedit} location={location} resource={resource} fields={React.Children.toArray(children)} ids={ids} data={data} currentSort={query}
                          basePath={basePath} updateSort={this.updateSort}/>
                <Pagination resource={resource} page={parseInt(query.page, 15)} perPage={parseInt(query.perPage, 15)}
                            total={total} setPage={this.setPage}/>
            </Card>
        );
    }
}

EmbededList.propTypes = {
    title: PropTypes.any,
    filter: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
    ]),
    resource: PropTypes.string.isRequired,
    linkreference: PropTypes.bool,
    changeParams: PropTypes.bool,
    hasCreate: PropTypes.bool.isRequired,
    hasEdit: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    path: PropTypes.string,
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    ids: PropTypes.array,
    total: PropTypes.number.isRequired,
    data: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    crudGetList: PropTypes.func.isRequired,
    changeListParams: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    quickedit:PropTypes.bool,
};

function mapStateToProps(state, props) {
    const resourceState = state.admin[props.resource];
    const query = props.location.query;
    if (query.filter && typeof query.filter === 'string') {
        query.filter = JSON.parse(query.filter);
    }
    // console.log("EmbededList, List, mapStateToProps, ", state.linkreference, props.linkreference);

    var linkreference = props.linkreference;
    var changeParams = false;

    if (query.filter && query.filter.changeParams) {
        // linkreference = false;
        changeParams = true;
    }
    if (props.linkreference && !props.changeParams) {
        // console.log("EmbededList, List, mapStateToProps, Skip re-render, ", props.linkreference, !props.changeParams);
    }

    return {
        query,
        params: resourceState.list.params,
        ids: resourceState.list.ids,
        total: resourceState.list.total,
        data: resourceState.data,
        isLoading: state.admin.loading > 0,
        linkreference: linkreference,
        changeParams: changeParams
    };
}

export default connect(
    mapStateToProps,
    {
        crudGetList: crudGetListAction,
        changeListParams: changeListParamsAction,
        push: pushAction,
    },
)(EmbededList);
