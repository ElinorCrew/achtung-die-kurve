/*global io */
var achtung = (function (io) {
    'use strict';

    var socket = io.connect('http://localhost:8080'),
        state = {
            board: 1,
            player: 1,
            move: "L"
        };
    socket.emit("move", state);
}(io));
