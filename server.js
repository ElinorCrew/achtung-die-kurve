/*jslint node: true, nomen: true, unparam: true, es5: true */
'use strict';

var express = require('express'),
    http = require('http'),
    path = require('path'),
    io = require('socket.io'),
    errorhandler = require('errorhandler'),
    board = require('./lib/board.js'),
    app = express(),
    options = {
        port: 8080,
        debug: true
    };

app.set('port', options.port);
app.set('debug', options.debug);

app.use(express.static(path.join(__dirname, '/client')));

// development only
if (app.get('debug')) {
    app.use(errorhandler());
}

app.get("/", function (req, res) {
    res.redirect("/index.html");
});

var server = http.createServer(app);
var serverio = io.listen(server);

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

board.init(serverio);
serverio.sockets.on('connection', board.connect);
