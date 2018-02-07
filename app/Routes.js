"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Locals_1 = require("../Locals");
var ImagerController_1 = require("./Controllers/ImagerController");
var GameController_1 = require("./Controllers/GameController");
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.prototype.initialize = function (app) {
        var router;
        router = express_1.Router();
        // Locals
        Locals_1.default.init(app);
        // Routes
        app.use('/', ImagerController_1.default);
        app.use('/', GameController_1.default);
    };
    return Routes;
}());
exports.Routes = Routes;
exports.default = new Routes;
