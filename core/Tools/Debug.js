"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = /** @class */ (function () {
    function Debug() {
    }
    Debug.prototype.client = function (socket, thing, to, room) {
        if (to) {
            if (to == 'all') {
                socket.sockets.emit('debug to client', thing);
            }
            else if (to == 'room') {
                socket.sockets.in(room).emit('debug to client', thing);
            }
        }
        else {
            socket.emit('debug to client', thing);
        }
    };
    return Debug;
}());
exports.Debug = Debug;
exports.default = new Debug;
