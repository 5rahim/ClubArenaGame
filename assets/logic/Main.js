///<reference path="CST.ts"/>
var MainClass = /** @class */ (function () {
    function MainClass() {
    }
    MainClass.prototype.init = function () {
        this.canvas = document.getElementById(CST.data.CANVAS);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
    };
    MainClass.prototype.initSocket = function (socket) {
        this.socket = socket;
        /**
         * On debug les données venant du serveur dans la console client
         * uniquement si on est en mode développement
         */
        socket.on('debug to client', function (data) {
            if (CST.data.ENV == 'dev') {
                console.log(data);
            }
        });
    };
    return MainClass;
}());
var Main = new MainClass;
Main.init();
