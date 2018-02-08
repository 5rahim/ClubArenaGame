"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerMove = /** @class */ (function () {
    function PlayerMove() {
    }
    PlayerMove.prototype.initialize = function (io) {
        io.sockets.on('connection', function (socket) {
        });
    };
    return PlayerMove;
}());
exports.PlayerMove = PlayerMove;
exports.default = new PlayerMove();
