///<reference path="../CST.ts"/>
var _Canvas = /** @class */ (function () {
    function _Canvas() {
    }
    _Canvas.prototype.init = function () {
        this.window = {};
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
    };
    return _Canvas;
}());
var Canvas = new _Canvas();
Canvas.init();
