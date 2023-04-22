"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClubView = /** @class */ (function () {
    function ClubView(player) {
        this.id = player.getInfo().getSocketID();
        this.player = player;
    }
    ClubView.prototype.getID = function () {
        return this.id;
    };
    ClubView.prototype.getPlayer = function () {
        return this.player;
    };
    return ClubView;
}());
exports.default = ClubView;
