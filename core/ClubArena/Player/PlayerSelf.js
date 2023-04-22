"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerSelf = /** @class */ (function () {
    function PlayerSelf() {
        this.position = {};
        this.moveFactor = 0;
    }
    /** Setters **/
    PlayerSelf.prototype.setMoveFactor = function (value) {
        this.moveFactor = value;
    };
    PlayerSelf.prototype.setInitialPosition = function (coords) {
        var x = coords[0];
        var y = coords[1];
        this.position.oldX = x;
        this.position.oldY = y;
        //this.position.currentX = Math.floor(Math.random() * (x - 0 + 1) + 0);
        //this.position.currentY = Math.floor(Math.random() * (y - 50 + 1) + 50);
        this.position.currentX = x;
        this.position.currentY = y;
        this.position.targetX = null;
        this.position.targetY = null;
    };
    PlayerSelf.prototype.setOldPosition = function (coords) {
        var x = coords[0];
        var y = coords[1];
        this.position.oldX = x;
        this.position.oldY = y;
    };
    PlayerSelf.prototype.setTargetPosition = function (coords) {
        var x = coords[0];
        var y = coords[1];
        this.position.targetX = x;
        this.position.targetY = y;
    };
    PlayerSelf.prototype.setCurrentPosition = function (coords) {
        var x = coords[0];
        var y = coords[1];
        this.position.currentX = x;
        this.position.currentY = y;
    };
    PlayerSelf.prototype.setIndex = function (value) {
        this.index = value;
    };
    PlayerSelf.prototype.setDirection = function (value) {
        this.direction = value;
    };
    PlayerSelf.prototype.setFlip = function (value) {
        this.flip = value;
    };
    /** Getters **/
    PlayerSelf.prototype.getMoveFactor = function () {
        return this.moveFactor;
    };
    PlayerSelf.prototype.getPositionCurrentX = function () {
        return this.position.currentX;
    };
    PlayerSelf.prototype.getPositionCurrentY = function () {
        return this.position.currentY;
    };
    PlayerSelf.prototype.getPositionTargetX = function () {
        return this.position.targetX;
    };
    PlayerSelf.prototype.getPositionTargetY = function () {
        return this.position.targetY;
    };
    PlayerSelf.prototype.getPositionOldX = function () {
        return this.position.oldX;
    };
    PlayerSelf.prototype.getPositionOldY = function () {
        return this.position.oldY;
    };
    PlayerSelf.prototype.getIndex = function () {
        return this.index;
    };
    return PlayerSelf;
}());
exports.default = PlayerSelf;
