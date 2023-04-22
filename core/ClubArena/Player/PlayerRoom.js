"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerRoom = /** @class */ (function () {
    function PlayerRoom(info, avatar, self) {
        this.info = info;
        this.avatar = avatar;
        this.self = self;
    }
    PlayerRoom.prototype.getInfo = function () {
        return this.info;
    };
    PlayerRoom.prototype.getAvatar = function () {
        return this.avatar;
    };
    PlayerRoom.prototype.getSelf = function () {
        return this.self;
    };
    return PlayerRoom;
}());
exports.default = PlayerRoom;
