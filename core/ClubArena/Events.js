"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameEnvironment_1 = require("./GameEnvironment");
var UserModel_1 = require("../../app/Models/UserModel");
var AvatarModel_1 = require("../../app/Models/AvatarModel");
var Player_1 = require("./Player/Player");
var ClubView_1 = require("./ClubView/ClubView");
var Debug_1 = require("../Tools/Debug");
var Events = /** @class */ (function () {
    function Events() {
    }
    /** Envoyer un evenement **/
    /**
     * Initialiser le splash screen
     * @param io
     * @param socket
     */
    Events.prototype.initSplashScreen = function (io, socket) {
        GameEnvironment_1.default.getSplashScreenManager().init(socket);
    };
    Events.prototype.sendState = function (socket) {
        setInterval(function () {
            socket.emit('server game state update', {
                players: GameEnvironment_1.default.getPlayerManager().getPlayers(),
                clubViews: GameEnvironment_1.default.getClubViewManager().getViews(),
                rooms: GameEnvironment_1.default.getRoomManager().getRooms(),
                roomsEntities: GameEnvironment_1.default.getRoomManager().getRoomsEntities()
            });
        }, GameEnvironment_1.default.getFrameRate());
    };
    /** Traiter un evenement reçu **/
    /**
     * Lorsque le joueur arrive
     * @param io
     * @param socket
     */
    Events.prototype.incomingPlayer = function (io, socket) {
        var _this = this;
        // Lorsque le client informe de l'entrée du joueur
        socket.on('incoming player', function (data) { return __awaiter(_this, void 0, void 0, function () {
            var player, playerAvatar, playerSocketID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserModel_1.default.findBy('token', data.token)];
                    case 1:
                        player = _a.sent();
                        return [4 /*yield*/, AvatarModel_1.default.findBy('user_token', data.token)];
                    case 2:
                        playerAvatar = _a.sent();
                        GameEnvironment_1.default.getPlayerManager().addPlayer(new Player_1.default({ player: player, avatar: playerAvatar }, socket.id));
                        GameEnvironment_1.default.getClubViewManager().addView(new ClubView_1.default(GameEnvironment_1.default.getPlayerManager().getPlayer(socket.id)));
                        Debug_1.default.client(io, 'Player connected', 'all');
                        Debug_1.default.client(io, GameEnvironment_1.default.getPlayerManager().getPlayers(), 'all');
                        playerSocketID = socket.id;
                        GameEnvironment_1.default.getMaintenanceManager().handleMaintenance(playerSocketID, function () {
                            socket.emit('init game', {
                                playerSocketID: playerSocketID,
                                clubView: GameEnvironment_1.default.getClubViewManager().getView(playerSocketID),
                                player: GameEnvironment_1.default.getPlayerManager().getPlayer(playerSocketID)
                            });
                        }, function () {
                            socket.emit('alert maintenance', {});
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Lorsque le joueur part
     * @param io
     * @param socket
     */
    Events.prototype.outgoingPlayer = function (io, socket) {
        socket.on('disconnect', function () {
            var player = GameEnvironment_1.default.getPlayerManager().getPlayer(socket.id);
            if (player && socket.id) {
                GameEnvironment_1.default.getRoomManager().leaveEverywhere(socket.id);
                GameEnvironment_1.default.getPlayerManager().removePlayer(socket.id);
                GameEnvironment_1.default.getClubViewManager().removeView(socket.id);
            }
        });
    };
    /**
     * On fait entrer le player dans sa room par défaut (View)
     * @param io
     * @param socket
     */
    Events.prototype.initSocketRoom = function (io, socket) {
        if (socket.id) {
            socket.on('init socket room', function () {
                var playerSocketID = socket.id;
                GameEnvironment_1.default.getPlayerManager().getPlayer(playerSocketID).setCurrentRoom(socket.id);
                socket.join(socket.id);
            });
        }
    };
    /**
     * Lorsque le player demande a rejoindre une room
     * @param io
     * @param socket
     */
    Events.prototype.requestJoinRoom = function (io, socket) {
        if (socket.id) {
            socket.on('request join room', function (data) {
                Debug_1.default.client(socket, 'Request join room ' + data.roomID);
                GameEnvironment_1.default.getRoomManager().joinRoom(io, socket, socket.id, data.roomID);
            });
        }
    };
    /**
     * Lorsque le player demande a rejoindre le clubview
     * @param io
     * @param socket
     */
    Events.prototype.requestJoinClubView = function (io, socket) {
        if (socket) {
            socket.on('request join club view', function () {
                Debug_1.default.client(socket, 'Request join club view');
                GameEnvironment_1.default.getRoomManager().joinClubView(io, socket, socket.id);
            });
        }
    };
    return Events;
}());
exports.default = Events;
