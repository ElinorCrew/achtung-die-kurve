var path = function (inputCoords) {
    'use strict';

    var p = {},
        coords = inputCoords || [],

        first = function (array) {
            return array.slice(0, 1)[0];
        },

        rest = function (array) {
            return array.slice(1, array.length);
        },

        d = function (array, command) {
            if (!array[0]) {
                return '';
            }

            var firstCoord = first(array),
                dx = firstCoord[0],
                dy = firstCoord[1],
                arg = command || 'M';

            return arg
                + dx + ' '
                + dy
                + d(rest(array), ' L');
        };

    p.push = function (coord) {
        return path(
            coords.concat([coord])
        );
    };

    p.string = function () {
        return pathString(coords);
    };

    p.value = function () {
        return coords;
    };

    return p;
};