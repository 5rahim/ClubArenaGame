"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = require("../../core/Database/Model");
var AvatarModel = /** @class */ (function (_super) {
    __extends(AvatarModel, _super);
    function AvatarModel() {
        return _super.call(this, 'user_avatar') || this;
    }
    return AvatarModel;
}(Model_1.Model));
exports.AvatarModel = AvatarModel;
exports.default = new AvatarModel;
