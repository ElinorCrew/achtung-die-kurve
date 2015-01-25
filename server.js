/*jslint node: true, nomen: true, unparam: true, es5: true */
'use strict';

var express = require('express'),
    http = require('http'),
    path = require('path'),
    io = require('socket.io'),
    errorhandler = require('errorhandler'),
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
var io = io.listen(server);

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


io.on("connect", function (socket) {
    console.log("Connected");

    socket.on("move", function (state) {
        var print = ["board : " + state.board, "Player : " + state.player, "Move : " + state.move];
        console.log(print.join("\n"));
    });

    socket.on("disconnect", function () {
        console.log("Disconnected");
    });
});
