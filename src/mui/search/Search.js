import React, {Component, ReactClass, PropTypes} from 'the-react';

import {connect} from 'react-redux';

var analytics = require('ga-browser')();
import Sentiment from "../sentiment/Sentiment";
import {SearchCommentsList} from './SearchCommentsList';

import {
    SearchBox,
    SearchkitProvider,
    SearchkitManager,
    SideBar,
    TopBar,
    Layout,
    LayoutBody,
    LayoutResults,
    ActionBar,
    ActionBarRow,
    MovieHitsGridItem,
    TagCloud,
    RefinementListFilter,
    NoHits,
    Hits,
    HitsStats,
    SearchkitComponent,
    SelectedFilters,
    MenuFilter,
    HierarchicalMenuFilter,
    Pagination,
    ResetFilters
} from "searchkit";


const RefinementOption = (props) => (
    <div className={props.bemBlocks.option().state({selected: props.selected}).mix(props.bemBlocks.container("item"))}
         onClick={props.onClick}>
        <div className={props.bemBlocks.option("text")}><Sentiment sentiment={props.label}/></div>
        <div className={props.bemBlocks.option("count")}>{props.count}</div>
    </div>
);

const SelectedFilter = (props) => (
    <div className={props.bemBlocks.option()
        .mix(props.bemBlocks.container("item"))
        .mix(`selected-filter--${props.filterId}`)()}>
        <div className={props.bemBlocks.option("name")}>{props.labelKey}: {props.labelKey == "Sentiment" ?
            <Sentiment sentiment={props.labelValue}/> : props.labelValue}</div>
        <div className={props.bemBlocks.option("remove-action")} onClick={props.removeFilter}>x</div>
    </div>
);

const customHitStats = (props) => {
    const {bemBlocks, hitsCount, timeTaken} = props;

    return (
        <div className={bemBlocks.container()} data-qa="hits-stats">
            <div className={bemBlocks.container("info")} data-qa="info">
                We found {hitsCount} comments in {timeTaken}ms!

            </div>
        </div>
    )
};
function gup(name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}

class Search extends Component {

    componentDidMount() {
        analytics('create', 'UA-51773618-1', 'auto');
        setInterval(function () {
            ga('send', 'event', 'ping', window.location.href, {}, 0)
        }, 10000);
    }

    render() {

        var searcbox = "";
        if (typeof window !== 'undefined') {
            var searchOnLoad = false;
            var q = gup("q");
            if (q) {
                searchOnLoad = true;
            }

            const searchkit = new SearchkitManager("https://api.mdl.com/elk/_all", {
                searchOnLoad: searchOnLoad,
                useHistory: true,
                httpHeaders: {
                    "MDL-KEY": "HL3Q87OdXRXiun8LSyAy5vmCDJJCfyVrX97aIk_Ll2JcC0IG2yUpRoBOB7O6qRkDUAd6yQbD4gY="
                },
            });
            searcbox = <SearchkitProvider searchkit={searchkit}>
                <Layout>
                    <TopBar>
                        <SearchBox
                            autofocus={true}
                            searchOnChange={true}
                            searchThrottleTime={1500}
                            prefixQueryFields={["nick", "genre", "operator", "title", "language"]}/>
                    </TopBar>
                    <LayoutBody>
                        <SideBar>
                            <RefinementListFilter
                                id="languages"
                                title="Language"
                                field="languages"
                                operator="AND"
                                size={1}/>
                            <RefinementListFilter
                                id="nick"
                                title="Author"
                                field="nick"
                                operator="AND"
                                size={5}/>

                            <HierarchicalMenuFilter
                                fields={["operator"]}
                                title="Source"
                                id="operator"/>

                        </SideBar>
                        <LayoutResults>

                            <ActionBar>

                                <ActionBarRow>
                                    <HitsStats component={customHitStats}/>
                                </ActionBarRow>

                                <ActionBarRow>
                                    <SelectedFilters itemComponent={SelectedFilter}/>
                                    <ResetFilters/>
                                </ActionBarRow>

                            </ActionBar>
                            <Pagination showNumbers={true}/>

                            <Hits mod="sk-hits-grid" hitsPerPage={10} listComponent={SearchCommentsList}
                                  sourceFilter={["title", "comment", "nick", "operator", "sentiment"]}/>
                            <NoHits/>
                            <Pagination showNumbers={true}/>

                        </LayoutResults>
                    </LayoutBody>
                </Layout>
            </SearchkitProvider>
        }

        return (
            <div>
                {searcbox}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {comment: state.comment}
}

Search.propTypes = {
    comment: PropTypes.object,
};


export {Search}
export default connect(mapStateToProps)(Search)
