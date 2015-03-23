/**
 * Created by Maurice on 10/26/2014.
 */

var express = require('express');
var open = require('open');
var serveStatic = require('serve-static');
var path = require('path');

var port = process.env.PORT || 8080;
var app = express();

var movies = require('./movies');
app.use('/api/movies', movies);

app.use(serveStatic(path.join(__dirname, '../wwwroot')));

app.listen(port, function () {
    console.info('The server is listening at port ' + port);
    open('http://localhost:' + port, 'chrome');
});
