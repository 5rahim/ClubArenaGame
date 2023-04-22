"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoomState_1 = require("./RoomState");
var RoomModel_1 = require("../../../app/Models/RoomModel");
var RoomLayout_1 = require("./RoomLayout");
var Room = /** @class */ (function () {
    function Room(row) {
        this.id = row.id;
        this.name = row.name;
        this.description = row.description;
        this.password = row.password;
        this.userMax = row.user_max;
        this.image = row.image;
        this.background_color = row.background_color;
        this.state = row.state.toUpperCase();
        this.layout = new RoomLayout_1.default(row);
        this.staffOnly = row.staffOnly == 1;
        this.freezed = false;
        this.muted = false;
        this.chatSpeed = row.chat_speed;
    }
    /** Setters **/
    Room.prototype.setMute = function (value) {
        this.muted = value;
    };
    Room.prototype.setFreeze = function (value) {
        this.freezed = value;
    };
    Room.prototype.setChatSpeed = function (value) {
        this.chatSpeed = value;
    };
    Room.prototype.setUserMax = function (roomID, value) {
        if (roomID && value > 0) {
            RoomModel_1.default.updateBy('id', roomID, 'user_max', value);
            this.userMax = value;
        }
    };
    Room.prototype.setClose = function (roomID) {
        if (roomID) {
            RoomModel_1.default.updateBy('id', roomID, 'state', RoomState_1.default.LOCKED);
            this.state = RoomState_1.default.LOCKED;
        }
    };
    Room.prototype.setOpen = function (roomID) {
        if (roomID) {
            RoomModel_1.default.updateBy('id', roomID, 'state', RoomState_1.default.OPEN);
            this.state = RoomState_1.default.OPEN;
        }
    };
    Room.prototype.setInvisible = function (roomID) {
        if (roomID) {
            RoomModel_1.default.updateBy('id', roomID, 'state', RoomState_1.default.INVISIBLE);
            this.state = RoomState_1.default.INVISIBLE;
        }
    };
    /** Getters **/
    Room.prototype.getID = function () {
        return this.id;
    };
    Room.prototype.getName = function () {
        return this.name;
    };
    Room.prototype.getDescription = function () {
        return this.description;
    };
    Room.prototype.getPassword = function () {
        return this.password;
    };
    Room.prototype.getUserMax = function () {
        return this.userMax;
    };
    Room.prototype.getState = function () {
        return this.state;
    };
    Room.prototype.getLayout = function () {
        return this.layout;
    };
    Room.prototype.getStaffOnly = function () {
        return this.staffOnly;
    };
    Room.prototype.getFreezed = function () {
        return this.freezed;
    };
    Room.prototype.getMuted = function () {
        return this.muted;
    };
    Room.prototype.getChatSpeed = function () {
        return this.chatSpeed;
    };
    return Room;
}());
exports.default = Room;
