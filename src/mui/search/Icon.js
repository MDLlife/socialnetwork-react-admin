var React = require('react');
var jdenticon = require("jdenticon");
var md5 = require('md5');

module.exports = React.createClass({
    render: function () {
        return (<div
            dangerouslySetInnerHTML={{__html:jdenticon.toSvg(md5(this.props.nick ? this.props.nick : ""), this.props.size ? this.props.size : 250)}}></div>);
    }
});