"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Room_1 = require("./Room");
var DataAccess_1 = require("../../Database/DataAccess");
var GameEnvironment_1 = require("../GameEnvironment");
var Debug_1 = require("../../Tools/Debug");
var PlayerRoom_1 = require("../Player/PlayerRoom");
var RoomEntities_1 = require("./RoomEntities");
var RoomManager = /** @class */ (function () {
    function RoomManager() {
        this.rooms = {};
        this.roomsEntities = {};
    }
    /**
     * Quitter une room
     * @param socket
     * @param roomID
     * @param player
     */
    RoomManager.prototype.leaveRoom = function (socket, roomID, player) {
        if (socket) {
            if (player) {
                var roomToLeave = GameEnvironment_1.default.getRoomManager().getRoom(roomID);
                if (roomToLeave) {
                    if (roomID != socket.id) {
                        roomToLeave ? GameEnvironment_1.default.getRoomManager().getRoomEntities(roomID).removeEntity(socket.id) : null;
                    }
                }
            }
        }
    };
    RoomManager.prototype.leaveEverywhere = function (playerSocketID) {
        for (var k in GameEnvironment_1.default.getRoomManager().getRooms()) {
            if (GameEnvironment_1.default.getRoomManager().getRoomEntities(k).entityInRoom(playerSocketID)) {
                GameEnvironment_1.default.getRoomManager().getRoomEntities(k).removeEntity(playerSocketID);
            }
        }
    };
    /**
     *
     * @param io
     * @param socket
     * @param {string} playerSocketID
     */
    RoomManager.prototype.joinClubView = function (io, socket, playerSocketID) {
        if (socket) {
            var player = GameEnvironment_1.default.getPlayerManager().getPlayer(playerSocketID);
            var currentRoom = player ? GameEnvironment_1.default.getPlayerManager().getPlayer(playerSocketID).getCurrentRoom() : null;
            if (player && currentRoom) {
                this.leaveRoom(socket, currentRoom, player);
                GameEnvironment_1.default.getPlayerManager().getPlayer(playerSocketID).setCurrentRoom(playerSocketID);
                socket.emit('join club view', {
                    player: GameEnvironment_1.default.getPlayerManager().getPlayer(playerSocketID)
                });
            }
        }
    };
    /**
     * Rejoindre une room
     * @param io
     * @param socket
     * @param {string} playerSocketID
     * @param {number} roomID
     */
    RoomManager.prototype.joinRoom = function (io, socket, playerSocketID, roomID) {
        if (socket) {
            // Verifier si la room est bloqué
            // Verifier que le joueur n'est pas banni
            // Verifier que le room n'est pas pleine
            var room = GameEnvironment_1.default.getRoomManager().getRoom(roomID);
            var player = GameEnvironment_1.default.getPlayerManager().getPlayer(playerSocketID);
            if (room && player) {
                if ((player.getPermission().hasAccessAnyRoom() == true && room.getState() == 'LOCKED') || (room.getState() == 'OPEN')) {
                    //if((player.getPermission().hasAccessAnyRoom() == true && room.getEntitysCount() >= room.getUserMax() ) || (room.getEntitysCount() < room.getUserMax())) {
                    /** Quitter l'ancienne room **/
                    GameEnvironment_1.default.getRoomManager().leaveRoom(socket, player.getCurrentRoom(), player);
                    /******************************/
                    /** Changements et ajout dans la nouvelle room **/
                    socket.join(roomID);
                    GameEnvironment_1.default.getPlayerManager().getPlayer(playerSocketID).setCurrentRoom(roomID);
                    GameEnvironment_1.default.getRoomManager().getRoomEntities(roomID).addEntity('player', playerSocketID, new PlayerRoom_1.default({ socketID: playerSocketID, username: player.getInfo().getUsername() }, player.getAvatar(), player.getSelf()));
                    GameEnvironment_1.default.getRoomManager().getRoomEntities(roomID).getEntity(playerSocketID).getSelf().setFlip('r');
                    GameEnvironment_1.default.getRoomManager().getRoomEntities(roomID).getEntity(playerSocketID).getSelf().setDirection('front');
                    var defaultYAndIndex = Math.random() * room.getLayout().getDoorY();
                    GameEnvironment_1.default.getRoomManager().getRoomEntities(roomID).getEntity(playerSocketID).getSelf().setIndex(defaultYAndIndex);
                    GameEnvironment_1.default.getRoomManager().getRoomEntities(roomID).getEntity(playerSocketID).getSelf().setInitialPosition([room.getLayout().getDoorX(), defaultYAndIndex]);
                    /*********************************/
                    /** Commencer a dessiner **/
                    socket.emit('draw room', {
                        playerSocketID: playerSocketID,
                        room: room
                    });
                    Debug_1.default.client(io, GameEnvironment_1.default.getRoomManager().getRoomEntities(roomID), 'room', roomID);
                    /*} else if ((player.getPermission().hasAccessAnyRoom() == false && room.getEntitysCount() >= room.getUserMax())) {

                        // Si la room est pleine
                        Debug.client(socket, 'Room is full')


                    }*/
                }
                else if (player.getPermission().hasAccessAnyRoom() == false && room.getState() == 'LOCKED') {
                    // Si la room est bloquée
                    Debug_1.default.client(socket, 'Room is closed');
                }
            }
        }
    };
    /** Setters **/
    RoomManager.prototype.loadRooms = function (io) {
        var _this = this;
        DataAccess_1.default.connection.query('SELECT * FROM rooms', function (err, rows) {
            if (err)
                return;
            if (rows) {
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    _this.addRoom(new Room_1.default(row), new RoomEntities_1.default());
                }
            }
        });
    };
    RoomManager.prototype.addRoom = function (room, roomEntities) {
        this.rooms[room.getID()] = room;
        this.roomsEntities[room.getID()] = roomEntities;
    };
    /** Getters **/
    RoomManager.prototype.getRoom = function (roomID) {
        return this.rooms[roomID];
    };
    RoomManager.prototype.getRoomEntities = function (roomID) {
        return this.roomsEntities[roomID];
    };
    RoomManager.prototype.getRooms = function () {
        return this.rooms;
    };
    RoomManager.prototype.getRoomsEntities = function () {
        return this.roomsEntities;
    };
    return RoomManager;
}());
exports.default = RoomManager;
