"use strict";
exports.__esModule = true;
exports.throttle = void 0;
// SymbolTable
// 中文所有汉字 -> 词语 -> 中文所有的词语
function throttle(fn, interval) {
    if (interval === void 0) { interval = 16; }
    var open = true;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!open) {
            return;
        }
        open = false;
        fn.apply(void 0, args);
        var ts = new Date().getTime();
        var mod = ts % interval;
        setTimeout(function () {
            open = true;
        }, interval - mod);
    };
}
exports.throttle = throttle;
