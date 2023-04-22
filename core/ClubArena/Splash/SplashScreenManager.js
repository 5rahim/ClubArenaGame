"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debug_1 = require("../../Tools/Debug");
var SplashScreenManager = /** @class */ (function () {
    function SplashScreenManager() {
    }
    SplashScreenManager.prototype.init = function (socket) {
        socket.on('loading', function () {
            Debug_1.default.client(socket, 'ClubArena is loading');
            socket.emit('load game');
        });
    };
    return SplashScreenManager;
}());
exports.default = SplashScreenManager;
