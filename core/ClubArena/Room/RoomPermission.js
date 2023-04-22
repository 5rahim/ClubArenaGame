"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoomPermission;
(function (RoomPermission) {
    RoomPermission[RoomPermission["NONE"] = 0] = "NONE";
    RoomPermission[RoomPermission["ANIM"] = 1] = "ANIM";
    RoomPermission[RoomPermission["MOD"] = 2] = "MOD";
    RoomPermission[RoomPermission["MANAGER"] = 3] = "MANAGER";
})(RoomPermission || (RoomPermission = {}));
exports.default = RoomPermission;
