"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClubViewManager = /** @class */ (function () {
    function ClubViewManager() {
        this.clubViews = {};
    }
    ClubViewManager.prototype.addView = function (clubView) {
        this.clubViews[clubView.getPlayer().getInfo().getSocketID()] = clubView;
    };
    ClubViewManager.prototype.removeView = function (playerSocketID) {
        delete this.clubViews[playerSocketID];
    };
    /** Getters **/
    ClubViewManager.prototype.getView = function (playerSocketID) {
        return this.clubViews[playerSocketID];
    };
    ClubViewManager.prototype.getViews = function () {
        return this.clubViews;
    };
    ClubViewManager.prototype.getViewsCount = function () {
        return this.clubViews.length;
    };
    return ClubViewManager;
}());
exports.default = ClubViewManager;
