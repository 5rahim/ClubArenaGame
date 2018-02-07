"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Socketio = /** @class */ (function () {
    function Socketio() {
    }
    Socketio.prototype.initialize = function (io) {
        var users = [];
        io.sockets.on('connection', function (socket) {
        });
    };
    return Socketio;
}());
exports.Socketio = Socketio;
exports.default = new Socketio;
