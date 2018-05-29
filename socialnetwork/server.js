var express = require('express');
var path = require('path');

var app = express();

var port = process.env.PORT || 8085;
var publicPath = path.resolve(__dirname, 'static');

// We point to our static assets
app.use(express.static(publicPath));

app.use(express.static(__dirname, {'dist': ['dist/**/**']}));
app.use(express.static(__dirname, {'index': ['index.html']}));

// set up a route to redirect http to https

var targetprefix = "";
if (process.env.NODE_ENV !== 'production') {
    targetprefix = "http://localhost:3000"
} else {
    targetprefix = "https://api.mdl.live"
}

app.get('/login',function(req,res){
    res.redirect(targetprefix + "/login");
});

app.get('/logout',function(req,res){
    res.redirect(targetprefix + "/logout");
});

// And run the server
app.listen(port, function () {
    console.log('Server running on port ' + port);
});