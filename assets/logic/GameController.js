///<reference path="PlayerController.ts"/>
///<reference path="Main.ts"/>
///<reference path="LandingViewController.ts"/>
///<reference path="LoadingController.ts"/>
///<reference path="RoomController.ts"/>
///<reference path="TrackingController.ts"/>
var GameControllerClass = /** @class */ (function () {
    function GameControllerClass() {
        this.currentRoom = {};
        this.camera = {};
    }
    GameControllerClass.prototype.onEntrance = function () {
        /*
        Demander le chargement du jeu
         */
        Main.socket.emit('loading');
    };
    GameControllerClass.prototype.loadingView = function () {
        /*
        Lorsqu'on recoit une demande de draw loading screen
         */
        Main.socket.on('draw loading screen', function () {
            LoadingController.draw();
        });
    };
    GameControllerClass.prototype.landingView = function () {
        /*
        Lorsqu'on recoit une demande de draw landing view
         */
        Main.socket.on('draw landing view', function (data) {
            LandingViewController.draw(data);
        });
    };
    GameControllerClass.prototype.roomView = function () {
        /**
         * Lorsqu'on recoit la demande de draw une room
         * on passe les données des joueurs présents dans la room
         */
        Main.socket.on('draw room', function (data) {
            /**
             * On initialise le room controller qui débutera l'animation
             */
            RoomController.init(data);
            /** RoomUI.init(data) **/
            /**
             * On initialise les trackings
             */
            TrackingController.init(data);
        });
        /**
         * Un utilisateur veut quitter une room
         */
        Main.socket.on('leaving room', function (data) {
            RoomController.unset(data);
            TrackingController.unset();
        });
    };
    GameControllerClass.prototype.listenToServerUpdate = function () {
        var _this = this;
        /**
         * Lorsqu'on recoit le socket d'update du server
         */
        Main.socket.on('server game state update', function (data) {
            _this.players = data.players;
            _this.rooms = data.rooms;
            _this.cameras = data.cameras;
        });
    };
    return GameControllerClass;
}());
var GameController = new GameControllerClass;
GameController.onEntrance();
GameController.loadingView();
GameController.landingView();
GameController.roomView();
GameController.listenToServerUpdate();
