"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Players = /** @class */ (function () {
    function Players() {
    }
    Players.prototype.initialize = function (io) {
        io.sockets.on('connection', function (socket) {
        });
    };
    return Players;
}());
exports.Players = Players;
exports.default = new Players;
