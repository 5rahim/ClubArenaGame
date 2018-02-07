///<reference path="Main.ts"/>
///<reference path="PlayerController.ts"/>
///<reference path="Assets.ts"/>
var LoadingControllerClass = /** @class */ (function () {
    function LoadingControllerClass() {
    }
    LoadingControllerClass.prototype.init = function () {
        this.LOADING_SCREEN_LOGO = new Image();
        this.LOADING_SCREEN_LOGO.src = CST.data.IMAGES_PATH + 'loading_screen_logo.png';
    };
    LoadingControllerClass.prototype.draw = function () {
        var _this = this;
        Main.ctx.beginPath();
        Main.ctx.rect(0, 0, Main.canvas.width, Main.canvas.height);
        Main.ctx.fillStyle = '#000';
        Main.ctx.fill();
        // Draw laoding screen logo
        var dstX = Main.canvas.width / 2 - this.LOADING_SCREEN_LOGO.width / 2;
        var dstY = Main.canvas.height / 2 - this.LOADING_SCREEN_LOGO.height;
        Main.ctx.drawImage(this.LOADING_SCREEN_LOGO, dstX, dstY);
        Main.ctx.font = "18px Arial";
        Main.ctx.textAlign = 'center';
        Main.ctx.textBaseline = 'middle';
        Main.ctx.fillStyle = "#fff";
        Main.ctx.fillText("Chargement...", Main.canvas.width / 2, Main.canvas.height / 2);
        Main.ctx.restore();
        /*
        On demande au client de charger toutes les images
         */
        Assets.loadImages(function () {
            /*
            Si les images ont été chargées
             */
            _this.loaded();
        });
    };
    LoadingControllerClass.prototype.loaded = function () {
        // On demande l'initialisation du landing view {LandingView}
        Main.socket.emit('init landing view');
        // On informe l'entrée d'un utilisateur en lui passant son token {Game}
        Main.socket.emit('incoming player', { token: PlayerController.token });
    };
    return LoadingControllerClass;
}());
var LoadingController = new LoadingControllerClass;
LoadingController.init();
