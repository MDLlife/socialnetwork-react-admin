import React, {Component, ReactClass, PropTypes} from 'the-react';

import * as _ from "lodash";

import Icon from "./Icon";

import {Sentiment} from "../index";

require("./theme.css");



class SearchCommentsList extends React.Component {

    render() {
        const {hits} = this.props;

        if (!hits || hits.length == 0) {
            return ("")
        }

        return (
            <div style={{width: '100%', boxSizing: 'border-box', padding: 8}}>
                <table className="sk-table sk-table-striped" style={{width: '100%', boxSizing: 'border-box'}}>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Author</th>
                        <th>Comment</th>
                        <th>News</th>
                    </tr>
                    </thead>
                    <tbody>
                    {_.map(hits, hit => (

                        <tr key={hit._id}>
                            <td><Icon nick={hit._source ? hit._source.nick : ""}
                                      size={40}/>{hit._source ? hit._source.operator : ""}</td>
                            <td><b>{hit._source ? hit._source.nick : ""}</b></td>
                            <td>
                                <Sentiment sentiment={hit._source ? hit._source.sentiment : ""}/>
                                {hit._source ? hit._source.comment : ""}
                            </td>
                            <td>{hit._source ? (hit._source.title && hit._source.title.length > 35 ? hit._source.title.substring(0, 35) + "..." : hit._source.title) : ""}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export {SearchCommentsList}