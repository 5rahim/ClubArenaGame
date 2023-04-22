"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerPermission = /** @class */ (function () {
    function PlayerPermission(player) {
        this._hasAccessInMaintenance = (player.rank >= 5);
        this._hasAccessAnyRoom = (player.rank >= 5);
        this._canStayAfterEject = (player.rank >= 5);
    }
    PlayerPermission.prototype.hasAccessInMaintenance = function () {
        return this._hasAccessInMaintenance;
    };
    PlayerPermission.prototype.hasAccessAnyRoom = function () {
        return this._hasAccessAnyRoom;
    };
    PlayerPermission.prototype.canStayAfterEject = function () {
        return this._canStayAfterEject;
    };
    return PlayerPermission;
}());
exports.default = PlayerPermission;
