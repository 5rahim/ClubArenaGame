"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entities = /** @class */ (function () {
    function Entities(row) {
        this.entities = {};
        if (row) {
            //this.addEntity for items
        }
    }
    /** Setters **/
    Entities.prototype.addEntity = function (type, id, entity) {
        if (type == 'player') {
            this.entities[id] = entity;
            this.entities[id].type = type;
        }
        else if (type == 'item') {
            this.entities[id] = entity;
            this.entities[id].type = type;
        }
    };
    Entities.prototype.removeEntity = function (type, id) {
        delete this.entities[id];
    };
    Entities.prototype.entityInRoom = function (type, id) {
        this.entities[id] ? true : false;
    };
    Entities.prototype.ejectPlayers = function () {
    };
    Entities.prototype.ejectPlayer = function (playerSocketID) {
    };
    Entities.prototype.summonPlayer = function (playerSocketID) {
    };
    Entities.prototype.mutePlayer = function (playerSocketID) {
    };
    Entities.prototype.unmutePlayer = function (playerSocketID) {
    };
    Entities.prototype.banPlayer = function (playerSocketID) {
    };
    Entities.prototype.unbanPlayer = function (playerSocketID) {
    };
    Entities.prototype.freezePlayers = function (playerSocketID) {
    };
    /** Getters **/
    Entities.prototype.getEntities = function () {
        return this.entities;
    };
    Entities.prototype.getEntity = function (id) {
        return this.entities[id];
    };
    return Entities;
}());
exports.default = Entities;
