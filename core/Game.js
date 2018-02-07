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
var Player_1 = require("./Player");
var Debug_1 = require("./Debug");
var Room_1 = require("./Room");
var Camera_1 = require("./Camera");
var Game = /** @class */ (function () {
    function Game() {
        this.players = {};
        this.rooms = {};
        this.cameras = {};
        this.clients = {};
        this.frame_rate = 1000.0 / 30.0;
    }
    Game.prototype.initialize = function (io) {
        var _this = this;
        /**
         * On initilialise les rooms dans la variable globale
         */
        Room_1.default.setRooms(this.rooms);
        io.sockets.on('connection', function (socket) {
            /**
             * Lorsqu'un joueur entre dans le jeu {from LoadingController}
             */
            socket.on('incoming player', function (data) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            Debug_1.default.client(socket, 'Game loaded');
                            /**
                             * On l'initialise
                             */
                            // On ajoute le joueur
                            _a = this.players;
                            _b = socket.id;
                            return [4 /*yield*/, Player_1.default.setPlayer(socket.id, data.token)
                                // On ajoute la camera
                            ];
                        case 1:
                            /**
                             * On l'initialise
                             */
                            // On ajoute le joueur
                            _a[_b] = _g.sent();
                            // On ajoute la camera
                            _c = this.cameras;
                            _d = socket.id;
                            return [4 /*yield*/, Camera_1.default.setCamera(socket.id)
                                // On ajoute le landing view
                            ];
                        case 2:
                            // On ajoute la camera
                            _c[_d] = _g.sent();
                            // On ajoute le landing view
                            _e = this.rooms;
                            _f = socket.id;
                            return [4 /*yield*/, Room_1.default.setLandingRoom(socket, this.players[socket.id])
                                /**
                                 * Debug au client
                                 */
                            ];
                        case 3:
                            // On ajoute le landing view
                            _e[_f] = _g.sent();
                            /**
                             * Debug au client
                             */
                            Debug_1.default.client(io, 'User joined', 'all');
                            Debug_1.default.client(io, this.players[socket.id], 'all');
                            Debug_1.default.client(io, 'Rooms', 'all');
                            Debug_1.default.client(io, this.rooms, 'all');
                            /**
                             * On initialise le landing view propre à l'utilisateur
                             */
                            Room_1.default.joinLandingRoom(io, socket, this.players);
                            return [2 /*return*/];
                    }
                });
            }); });
            /**
             * Quand le joueur quitte la page, on le supprime
             */
            socket.on('disconnect', function () {
                if (_this.players[socket.id] !== undefined) {
                    Room_1.default.leaveRoom(_this.players[socket.id].currentRoom, socket, _this.players, _this.rooms);
                    delete _this.players[socket.id];
                }
                delete _this.rooms[socket.id];
                delete _this.cameras[socket.id];
            });
            /**
             * On update le serveur chaque frame
             * avec les données des players vers le client
             */
            setInterval(function () {
                _this.updateStateToClient(socket);
            }, _this.frame_rate);
        });
    };
    /**
     * On envoie les données au client
     * @param socket
     */
    Game.prototype.updateStateToClient = function (socket) {
        socket.emit('server game state update', { players: this.players, rooms: this.rooms, cameras: this.cameras });
    };
    return Game;
}());
exports.Game = Game;
exports.default = new Game;
