/*jslint node: true, nomen: true, unparam: true, es5: true */
'use strict';

var io,
    boards = [],
    i = 0;

var createBoard = function (socket, name) {
    return {
        name: name,
        socket: socket,
        id: socket.id,
        players: []
    };
};

var createPlayer = function (socket, board, name) {
    return {
        socket: socket,
        board: board
    };
};

var getBoard = function (boardId) {
    var board = boards.filter(function (board) {
        return board.id === boardId;
    });
    if (board.length > 0) {
        return board[0];
    }
    return false;
};

exports.init = function (socketio) {
    io = socketio;
};

exports.connect = function (socket) {
    var isBoard = false,
        id = socket.id;

    socket.on("createBoard", function (name) {
        isBoard = true;
        boards.push(createBoard(socket, name));
        console.log("Created board : " + name + " id : " + id);
    });

    socket.on("getBoards", function () {
        socket.emit("boards", boards);
        console.log("Boards : " + boards);
    });

    socket.on("joinBoard", function (data) {
        var board = getBoard(data.boardId);
        if (board) {
            board.socket.emit("addPlayer", socket.id);
            console.log("Player " + id + " joined board " + board.id);
        } else {
            socket.emit("boardError", "Board don't exist!");
            console.log("Board don't exist " + data.boardId);
        }
    });

    socket.on("updateDirection", function (data) {
        var board = getBoard(data.boardId);
        if (board) {
            board.socket.emit("updatePlayerState", {
                direction: data.direction,
                playerId: socket.id
            });
            console.log("updateDirection " + id + " " + data.direction);
        } else {
            socket.emit("boardError", "Board don't exist!");
            console.log("Board don't exist " + data.boardId);
        }
    });

    socket.on("disconnect", function () {
        if (!isBoard) {
            boards.forEach(function (board) {
                board.socket.emit("removePlayer", socket.id);
            });
        }
        console.log("Disconnected");
    });
    console.log("Connected");
};
