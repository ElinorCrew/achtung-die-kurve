/*jslint node: true, nomen: true, unparam: true, es5: true */
'use strict';

var io;

exports.init = function (socketio) {
    io = socketio;
};

exports.connect = function (socket) {
    console.log("Connected");

    socket.on("move", function (state) {
        var print = ["board : " + state.board, "Player : " + state.player, "Move : " + state.move];
        console.log(print.join("\n"));
    });

    socket.on("disconnect", function () {
        console.log("Disconnected");
    });
};
