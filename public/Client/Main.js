///<reference path="CST.ts"/>
var _Main = /** @class */ (function () {
    function _Main() {
    }
    _Main.prototype.initSocket = function (socket) {
        this.socket = socket;
        socket.on('debug to client', function (data) {
            if (CST.data.ENV == 'dev') {
                console.log(data);
            }
        });
    };
    _Main.prototype.initToken = function (token) {
        this.token = token;
    };
    return _Main;
}());
var Main = new _Main();
