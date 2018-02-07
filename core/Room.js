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
var DataAccess_1 = require("./DataAccess");
var Debug_1 = require("./Debug");
var Game_1 = require("./Game");
var Rooms = /** @class */ (function () {
    function Rooms() {
    }
    Rooms.prototype.initialize = function (io) {
        var _this = this;
        io.sockets.on('connection', function (socket) {
            /**
             * Lorsqu'un joueur veut rejoindre une room
             */
            socket.on('join room', function (data) {
                Debug_1.default.client(io, socket.id + ' wants to join room: ' + data.id, 'all');
                _this.joinRoom(io, socket, data.id);
            });
            /**
             * Lorsqu'un joueur veut quitter une room
             */
            socket.on('join landing room', function () {
                _this.joinLandingRoom(io, socket, Game_1.default.players);
            });
        });
    };
    /**
     * Faire rentrer un joueur dans une room
     * On lui fait quitter sa room actuelle
     * puis re-rentrer dans une nouvelle room
     * @param io
     * @param socket
     * @param id
     */
    Rooms.prototype.joinRoom = function (io, socket, id) {
        var players = Game_1.default.players;
        var cameras = Game_1.default.cameras;
        var rooms = Game_1.default.rooms;
        if (players[socket.id]) {
            this.leaveRoom(players[socket.id].currentRoom, socket, players, rooms);
        }
        // On change la current room du joueur
        players[socket.id].currentRoom = id;
        // On ajoute le joueur dans la liste des joueurs présents dans la room
        rooms[id].playersIn.push(players[socket.id]);
        /**
         * On log les informations de la room au client
         */
        Debug_1.default.client(socket, rooms[id]);
        socket.join(id);
        /**
         * On demande a draw la room
         * en passant les données de la room
         * et les données de la camera du joueur
         */
        //  Limitation du nombre de personnes
        if (rooms[id].max_users > rooms[id].playersIn.length) {
            //io.sockets.in(id).emit('draw room', { id: id, socketid: socket.id })
            socket.emit('draw room', { id: id, socketid: socket.id });
        }
        else {
            /** Envoyer une alerte pour signaler le manque de place au player **/
            this.joinLandingRoom(io, socket, players);
        }
    };
    /**
     * Quitter une room
     * @param id
     * @param socket
     * @param players
     * @param rooms
     */
    Rooms.prototype.leaveRoom = function (id, socket, players, rooms) {
        /**
         * On informe le client que le player quitte la room
         */
        socket.emit('leaving room', { id: id, socketid: socket.id });
        socket.leave(players[socket.id].currentRoom);
        // Retirer le player de la room actuelle
        // Parties inutiles mais c'est comme ça
        for (var i = 0; i < rooms[id].playersIn.length; i++) {
            // Si il y a une room dans laquelle le player se trouve
            // On le retire de cette room
            if (rooms[id].playersIn[i].socketid == socket.id) {
                rooms[id].playersIn = rooms[id].playersIn.filter(function (item) { return item !== rooms[id].playersIn[i]; });
            }
        }
        Debug_1.default.client(socket, 'You are leaving ' + rooms[id].id);
        Debug_1.default.client(socket, rooms);
    };
    /**
     * On met toutes les rooms dans la variable globale
     * @param rooms
     */
    Rooms.prototype.setRooms = function (rooms) {
        DataAccess_1.default.connection.query('SELECT * FROM rooms', function (err, rows) {
            if (err)
                return {};
            if (rows) {
                for (var k in rows) {
                    var room = rows[k];
                    rooms[room.id] = {
                        id: room.id,
                        owner_token: room.owner_token,
                        name: room.name,
                        max_users: room.max_users,
                        background_color: room.background_color,
                        image: room.image,
                        landing: false,
                        isPublic: room.isPublic,
                        playersIn: []
                    };
                }
            }
            else {
                return {};
            }
        });
    };
    /**
     * On ajouter la landing view de l'utilisateur
     * dans la variable globale
     * @param socket
     * @param player
     * @returns {Promise<any> | Promise}
     */
    Rooms.prototype.setLandingRoom = function (socket, player) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = {
                    id: socket.id,
                    landing: true,
                    playersIn: [player]
                };
                resolve(data);
                return [2 /*return*/];
            });
        }); });
    };
    /**
     * On fait rentrer le joueur dans une room personnelle (landing view)
     */
    Rooms.prototype.joinLandingRoom = function (io, socket, players) {
        var rooms = Game_1.default.rooms;
        // Si la current room du player n'est pas la landing view
        // Sinon pas besoin de quitter tel room
        if (players[socket.id].currentRoom !== socket.id) {
            // On lui fait quitter la room dans laquelle il est
            this.leaveRoom(players[socket.id].currentRoom, socket, players, rooms);
            // On change la current room du joueur
            players[socket.id].currentRoom = socket.id;
            // On ajoute le joueur dans sa landing view
            Game_1.default.rooms[socket.id].playersIn = [players[socket.id]];
        }
        var landingRoom = socket.id;
        socket.join(landingRoom);
        // On demande a draw le landing view pour le joueur actuel uniquement
        io.sockets.in(landingRoom).emit('draw landing view', { player: players[socket.id] });
    };
    return Rooms;
}());
exports.Rooms = Rooms;
exports.default = new Rooms();
