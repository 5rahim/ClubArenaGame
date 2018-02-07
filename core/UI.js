"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UI = /** @class */ (function () {
    function UI() {
    }
    UI.prototype.initialize = function (io) {
        io.sockets.on('connection', function (socket) {
        });
    };
    return UI;
}());
exports.UI = UI;
exports.default = new UI();
