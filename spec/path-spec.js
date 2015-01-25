/*global describe, it, expect, path*/

describe('path', function() {
    'use strict';

    it('.value() should return empty array as default', function() {
        var p = path();

        expect(p.value()).toEqual([]);
    });

    it('.value() should return specified list', function() {
        var p = path([
            [2, 3],
            [3, 4]
        ]);

        expect(p.value()).toEqual([
            [2, 3],
            [3, 4]
        ]);
    });

    it('.push() should add a coordinate', function() {
        var p = path()
            .push([3, 4]);

        expect(p.value()).toEqual([
            [3, 4]
        ]);
    });

    it('.push() should allow chaining', function() {
        var p = path()
            .push([1, 2])
            .push([3, 4]);

        expect(p.value()).toEqual([
            [1, 2],
            [3, 4]
        ]);
    });

    it('.svg() return a path element with d attribute', function() {
        var p = path([
            [1, 2],
            [3, 4],
            [50, 100],
            [30, 50]
        ]);

        expect(p.svg()).toEqual('<path d="M1 2 L3 4 L50 100 L30 50" />');
    });

    it('.svg() should not fail for empty d value', function() {
        var p = path();

        expect(p.svg()).toEqual('<path d="" />');
    });
});