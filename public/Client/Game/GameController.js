///<reference path="../Main.ts"/>
///<reference path="../Splash/SplashScreenController.ts"/>
///<reference path="EventsController.ts"/>
///<reference path="../Splash/LoadingController.ts"/>
///<reference path="../ClubView/ClubViewController.ts"/>
///<reference path="../Room/RoomController.ts"/>
///<reference path="../Player/PlayerController.ts"/>
///<reference path="../Entities/EntitiesController.ts"/>
///<reference path="../Game/EventsController.ts"/>
///<reference path="../UI/UIController.ts"/>
var _GameController = /** @class */ (function () {
    function _GameController() {
    }
    _GameController.prototype.start = function () {
        Main.socket.emit('loading');
        this.eventsController = new EventsController();
        this.splashScreenController = new SplashScreenController();
        this.loadingController = new LoadingController();
        this.clubViewController = new ClubViewController();
        this.roomController = new RoomController();
        this.entitiesController = new EntitiesController();
        this.UIController = new UIController();
        /**
         * Evenements venant du serveur
         */
        this.eventsController.listenToServerUpdate(Main.socket);
        this.eventsController.listenLoadGame(Main.socket);
        this.eventsController.listenAlertMaintenance(Main.socket);
        this.eventsController.listenInitGame(Main.socket);
        this.eventsController.listenJoinClubView(Main.socket);
        this.eventsController.listenRemoveClubView(Main.socket);
        this.eventsController.listenUpdateRoom(Main.socket);
    };
    _GameController.prototype.setPlayerController = function (socketID, token) {
        this.playerController = new PlayerController(socketID, token);
    };
    _GameController.prototype.getEventsController = function () {
        return this.eventsController;
    };
    _GameController.prototype.getUIController = function () {
        return this.UIController;
    };
    _GameController.prototype.getClubViewController = function () {
        return this.clubViewController;
    };
    _GameController.prototype.getRoomController = function () {
        return this.roomController;
    };
    _GameController.prototype.getPlayerController = function () {
        return this.playerController;
    };
    _GameController.prototype.getEntitiesController = function () {
        return this.entitiesController;
    };
    _GameController.prototype.getSplashScreenController = function () {
        return this.splashScreenController;
    };
    _GameController.prototype.getLoadingController = function () {
        return this.loadingController;
    };
    _GameController.prototype.getViews = function () {
        return this.clubViews;
    };
    return _GameController;
}());
var GameController = new _GameController();
GameController.start();
