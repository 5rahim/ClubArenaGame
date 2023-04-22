"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClubViewManager_1 = require("./ClubView/ClubViewManager");
var SplashScreenManager_1 = require("./Splash/SplashScreenManager");
var PlayerManager_1 = require("./Player/PlayerManager");
var Events_1 = require("./Events");
var RoomManager_1 = require("./Room/RoomManager");
var Settings_1 = require("./Settings/Settings");
var MaintenanceManager_1 = require("./Maintenance/MaintenanceManager");
var GameEnvironment = /** @class */ (function () {
    function GameEnvironment() {
        this.frameRate = 1000.0 / 30.0;
    }
    GameEnvironment.prototype.initialize = function (io) {
        var _this = this;
        this.settings = new Settings_1.default();
        this.settings.init().then();
        this.events = new Events_1.default();
        this.maintenanceManager = new MaintenanceManager_1.default();
        this.clubViewManager = new ClubViewManager_1.default();
        this.splashScreenManager = new SplashScreenManager_1.default();
        this.playerManager = new PlayerManager_1.default();
        this.roomManager = new RoomManager_1.default();
        // Charger les rooms
        this.getRoomManager().loadRooms(io);
        // Lorsqu'un joueur se connecte
        io.sockets.on('connection', function (socket) {
            /**
             * Demarrer des evenements
             */
            _this.events.initSplashScreen(io, socket);
            /**
             * Evenements venant du client
             */
            _this.events.sendState(socket);
            _this.events.incomingPlayer(io, socket);
            _this.events.initSocketRoom(io, socket);
            _this.events.requestJoinRoom(io, socket);
            _this.events.requestJoinClubView(io, socket);
            _this.events.outgoingPlayer(io, socket);
        });
    };
    GameEnvironment.prototype.getPlayerManager = function () {
        return this.playerManager;
    };
    GameEnvironment.prototype.getClubViewManager = function () {
        return this.clubViewManager;
    };
    GameEnvironment.prototype.getRoomManager = function () {
        return this.roomManager;
    };
    GameEnvironment.prototype.getMaintenanceManager = function () {
        return this.maintenanceManager;
    };
    GameEnvironment.prototype.getSplashScreenManager = function () {
        return this.splashScreenManager;
    };
    GameEnvironment.prototype.getFrameRate = function () {
        return this.frameRate;
    };
    GameEnvironment.prototype.getSettings = function () {
        return this.settings;
    };
    return GameEnvironment;
}());
exports.GameEnvironment = GameEnvironment;
exports.default = new GameEnvironment;
