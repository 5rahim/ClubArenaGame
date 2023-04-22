"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoomLayout = /** @class */ (function () {
    function RoomLayout(row) {
        this.width = row.width;
        this.height = row.height;
        this.door_x = row.door_x;
        this.door_y = row.door_y;
    }
    RoomLayout.prototype.getWidth = function () {
        return this.width;
    };
    RoomLayout.prototype.getHeight = function () {
        return this.height;
    };
    RoomLayout.prototype.getDoorX = function () {
        return this.door_x;
    };
    RoomLayout.prototype.getDoorY = function () {
        return this.door_y;
    };
    return RoomLayout;
}());
exports.default = RoomLayout;
