"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Door_1 = require("../../core/Door");
var GameController = /** @class */ (function () {
    function GameController() {
        this.router = express_1.Router();
        this.routes;
    }
    GameController.prototype.routes = function () {
        this.router.get('/', function (req, res, next) {
            res.render('game/index', { loginErrors: '' });
        });
        this.router.get('/client', function (req, res, next) {
            Door_1.default.authRequired(req, res);
        });
        this.router.get('/logout', function (req, res, next) {
            Door_1.default.logout(req, res);
        });
        this.router.post('/login', function (req, res, next) {
            Door_1.default.login(req, res);
        });
    };
    return GameController;
}());
exports.GameController = GameController;
var Controller = new GameController();
Controller.routes();
exports.default = Controller.router;
