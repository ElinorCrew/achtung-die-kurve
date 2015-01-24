var path = function (input_coords) {
    'use strict';
    var p = {},
        coords = [];

    if (input_coords) {
        coords = input_coords;
    }

    p.push = function (coord) {
        return path(
            coords.concat([coord])
        );
    };

    p.value = function () {
        return coords;
    };

    return p;
};