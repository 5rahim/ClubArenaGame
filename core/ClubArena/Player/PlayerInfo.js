"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerInfo = /** @class */ (function () {
    function PlayerInfo(row, socketID) {
        this.id = row.id;
        this.username = row.username;
        this.token = row.token;
        this.email = row.email;
        this.created_at = row.created_at;
        this.socketID = socketID;
        //this.online = row.online
        this.rank = row.rank;
    }
    PlayerInfo.prototype.getSocketID = function () {
        return this.socketID;
    };
    PlayerInfo.prototype.getID = function () {
        return this.id;
    };
    PlayerInfo.prototype.getUsername = function () {
        return this.username;
    };
    PlayerInfo.prototype.getToken = function () {
        return this.token;
    };
    PlayerInfo.prototype.getEmail = function () {
        return this.email;
    };
    PlayerInfo.prototype.getCreatedAt = function () {
        return this.created_at;
    };
    PlayerInfo.prototype.getRank = function () {
        return this.rank;
    };
    PlayerInfo.prototype.getOnline = function () {
        return this.online;
    };
    return PlayerInfo;
}());
exports.default = PlayerInfo;
