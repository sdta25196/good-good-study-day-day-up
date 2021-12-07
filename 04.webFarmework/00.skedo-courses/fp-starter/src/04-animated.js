"use strict";
exports.__esModule = true;
var _02_throttle_1 = require("./02-throttle");
function interpolation(rangeA, rangeB) {
    var LA = rangeA[1] - rangeA[0];
    var LB = rangeB[1] - rangeB[0];
    return function (a) {
        if (a > rangeA[1]) {
            return rangeB[1];
        }
        if (a < rangeA[0]) {
            return rangeB[0];
        }
        var ratio = (a - rangeA[0]) / LA;
        return Math.round(ratio * LB + rangeB[0]);
    };
}
function pipe(fn1, fn2) {
    return function (a) {
        return fn2(fn1(a));
    };
}
// [0, 1]
var Animated = /** @class */ (function () {
    function Animated(mapF) {
        var _this = this;
        this.value = 0;
        this.timerFN = timer;
        this.start = function (tick, last, callback) {
            _this.timerFN(function (v) {
                _this.updateValue(v);
                callback(_this.getValue());
            }, tick, last);
        };
        this.mapF = mapF;
    }
    Animated.prototype.getValue = function () {
        return this.mapF(this.value);
    };
    Animated.prototype.updateValue = function (a) {
        this.value = a;
        return this;
    };
    Animated.prototype.map = function (fn) {
        var newMapF = pipe(this.mapF, fn);
        return new Animated(newMapF);
    };
    Animated.of = function (from, to) {
        var mapFunc = interpolation([0, 1], [from, to]);
        return new Animated(mapFunc);
    };
    return Animated;
}());
var raf = setTimeout;
var timer = function (callback, tick, last) {
    if (tick === void 0) { tick = 16; }
    if (last === void 0) { last = 300; }
    var start = new Date().getTime();
    var cb = _02_throttle_1.throttle(callback, tick);
    function rafLoop() {
        raf(function () {
            var ratio = (new Date().getTime() - start) / last;
            if (ratio > 1) {
                cb(1);
                return;
            }
            cb(ratio);
            rafLoop();
        });
    }
    rafLoop();
};
var str = "Hi, greetings....";
var a = Animated.of(0, str.length)
    .map(function (i) {
    return str.slice(0, i);
});
a.start(300, 5000, function () {
    console.clear();
    console.log(a.getValue());
});
