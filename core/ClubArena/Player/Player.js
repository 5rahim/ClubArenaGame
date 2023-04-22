"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerInfo_1 = require("./PlayerInfo");
var PlayerAvatar_1 = require("./PlayerAvatar");
var PlayerPermission_1 = require("./PlayerPermission");
var PlayerSelf_1 = require("./PlayerSelf");
var Player = /** @class */ (function () {
    function Player(data, socketID) {
        this.info = new PlayerInfo_1.default(data.player, socketID);
        this.avatar = new PlayerAvatar_1.default(data.avatar);
        this.permission = new PlayerPermission_1.default(data.player);
        this.self = new PlayerSelf_1.default();
        this.currentRoom = socketID;
    }
    /** Setters **/
    Player.prototype.setCurrentRoom = function (roomID) {
        this.currentRoom = roomID;
    };
    /** Getters **/
    Player.prototype.getCurrentRoom = function () {
        return this.currentRoom;
    };
    Player.prototype.getInfo = function () {
        return this.info;
    };
    Player.prototype.getAvatar = function () {
        return this.avatar;
    };
    Player.prototype.getSelf = function () {
        return this.self;
    };
    Player.prototype.getPermission = function () {
        return this.permission;
    };
    return Player;
}());
exports.default = Player;
