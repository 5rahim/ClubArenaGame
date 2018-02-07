"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LandingView = /** @class */ (function () {
    function LandingView() {
    }
    LandingView.prototype.initialize = function (io) {
        io.sockets.on('connection', function (socket) {
            /*
            Lorsqu'on reçoit le socket d'initialisation {from LoadingController}
             */
            socket.on('init landing view', function () {
                /*
                On demande au client de draw le landing view {GameController}
                 */
                //socket.emit('draw landing view')
            });
        });
    };
    return LandingView;
}());
exports.LandingView = LandingView;
exports.default = new LandingView;
