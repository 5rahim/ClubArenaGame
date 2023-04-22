"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerManager = /** @class */ (function () {
    function PlayerManager() {
        this.players = {};
    }
    PlayerManager.prototype.addPlayer = function (player) {
        this.players[player.getInfo().getSocketID()] = player;
    };
    PlayerManager.prototype.removePlayer = function (playerSocketID) {
        if (playerSocketID && this.players[playerSocketID]) {
            delete this.players[playerSocketID];
        }
    };
    /** Getters **/
    PlayerManager.prototype.getPlayer = function (playerSocketID) {
        return this.players[playerSocketID] ? this.players[playerSocketID] : null;
    };
    PlayerManager.prototype.getPlayers = function () {
        return this.players;
    };
    PlayerManager.prototype.getPlayersCount = function () {
        return this.players.length;
    };
    return PlayerManager;
}());
exports.default = PlayerManager;
