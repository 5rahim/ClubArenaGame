"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerAvatar = /** @class */ (function () {
    function PlayerAvatar(row) {
        this.head = row.head;
        this.hair = row.hair;
        this.eyes = row.eyes;
        this.body = row.body;
        this.clothes = row.clothes;
        this.feet = row.feet;
        this.arms = row.arms;
        this.skin = row.skin;
    }
    PlayerAvatar.prototype.getHead = function () {
        return this.head;
    };
    PlayerAvatar.prototype.getHair = function () {
        return this.hair;
    };
    PlayerAvatar.prototype.getEyes = function () {
        return this.eyes;
    };
    PlayerAvatar.prototype.getBody = function () {
        return this.body;
    };
    PlayerAvatar.prototype.getClothes = function () {
        return this.clothes;
    };
    PlayerAvatar.prototype.getFeet = function () {
        return this.feet;
    };
    PlayerAvatar.prototype.getArms = function () {
        return this.arms;
    };
    PlayerAvatar.prototype.getSkin = function () {
        return this.skin;
    };
    return PlayerAvatar;
}());
exports.default = PlayerAvatar;
