'use strict';

describe("My test", function(){
    it("a is in fact 'Hello World!' and b to be not null",function(){
        var a = "Hello World!";
        expect(a).toBe("Hello World!")
    })
    it("should be true, because it's truthful", function(){
        var b = true;
        expect(b).toBe(true);
    })
    it("e is not a number", function(){
        var e = 1;
        expect(e).toBe(1)
    })    
})
