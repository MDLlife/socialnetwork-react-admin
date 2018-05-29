var React = require('react');
var emojione = require("emojione");

var terrible = " Terrible!";
var sucks = " Sucks";
var bad = " Bad";
var notgood = " Not Good";
var eh = " Eh";
var neutral = " Neutral";
var ok = " OK";
var good = " Good";
var likeit = " Like It";
var lovedit = " Loved It";
var awesome = " Awesome!";
var unknown = " Unknown";

var emojis = {
    "-5": emojione.shortnameToUnicode(":scream:") + terrible,
    "-4": emojione.shortnameToUnicode(":angry:") + sucks,
    "-3": emojione.shortnameToUnicode(":worried:") + bad,
    "-2": emojione.shortnameToUnicode(":unamused:") + notgood,
    "-1": emojione.shortnameToUnicode(":confused:") + eh,
    "0": emojione.shortnameToUnicode(":expressionless:") + neutral,
    "1": emojione.shortnameToUnicode(":neutral_face:")  + ok,
    "2": emojione.shortnameToUnicode(":smile:") + good,
    "3": emojione.shortnameToUnicode(":smiley:") + likeit ,
    "4": emojione.shortnameToUnicode(":yum:") + lovedit,
    "5": emojione.shortnameToUnicode(":grinning:") + awesome,
    "6": emojione.shortnameToUnicode(":no_mouth:") + unknown
};

module.exports = React.createClass({
    render: function () {
        return (<div
            dangerouslySetInnerHTML={{__html:emojis[this.props.sentiment] }}></div>);
    }
});