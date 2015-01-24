var path = function () {
    'use strict';
    var newCalc = {};
 
    newCalc.add = function (number, optional) {
        return calc((optional || num) + number);
    };
 
    newCalc.substract = function (number, optional) {
        if (optional) {
            return calc(number - optional);
        }
        return calc(num - number);
    };
 
    newCalc.multiplyBy = function (number, optional) {
        return calc((optional || num) * number);
    };
 
    newCalc.divideBy = function (number, optional) {
        if (optional) {
            return calc(number / optional);
        }
        return calc(num / number);
    };
 
    newCalc.value = function () {
        return num;
    };
 
    return newCalc;
}();