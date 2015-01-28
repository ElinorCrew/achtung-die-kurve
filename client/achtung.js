/*global io */
// var achtung = (function (io) {
'use strict';

var createPlayer = function (player) {
    player.direction = player.direction || 0;
    return player;
};


var createBoard = function (boardName) {

    var socket = io.connect('http://localhost:8080'),
        name = boardName,
        id = socket.id,
        players = [];

    socket.on("connect", function () {
        console.log("Connected!");
        console.log(socket.id);
        id = socket.id;
    });

    socket.on("addPlayer", function (playerId) {
        console.log("Player" + playerId + " joined board " + socket.id);
        players.push(createPlayer(playerId));
    });

    socket.on("removePlayer", function (playerId) {
        console.log("Remove player" + playerId);
        players = players.filter(function (player) {
            return player.Id !== playerId;
        });
    });

    socket.on("updatePlayerState", function (state) {
        console.log(state);
        players = players.map(function (player) {
            if (state.playerId === player.Id) {
                player.direction = state.direction;
            }
            return player;
        });
    });

    socket.on("boardError", function (error) {
        console.log(error);
    });

    socket.emit("createBoard", name);

    return {
        name: name,
        socket: socket,
        players: players,
        id: function () {
            return id;
        }
    };

};

var createPlayer = function (username) {

    var socket = io.connect('http://localhost:8080'),
        boardId,
        id = socket.id,
        direction = 0,
        name = username,
        joinBoard = function (id) {
            boardId = id;
            socket.emit("joinBoard", {
                boardId: id,
                name: name
            });
        },
        updateDirection = function (direction) {
            socket.emit("updateDirection", {
                boardId: boardId,
                direction: direction
            });
        };

    socket.on("connect", function () {
        console.log("Connected!");
        id = socket.id;
    });

    socket.on("boardError", function (error) {
        console.log(error);
    });

    socket.on("boards", function (boards) {
        console.log("Boards : " + boards);
    });
    return {
        name: name,
        id: function () {
            return id;
        },
        direction: direction,
        joinBoard: joinBoard,
        updateDirection: updateDirection
    };
};

// var p = createPlayer("user");
// var b = createBoard("board");

// p.joinBoard(b.id());

// p.updateDirection(1);