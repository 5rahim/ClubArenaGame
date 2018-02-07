"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ImagerController = /** @class */ (function () {
    function ImagerController() {
        this.router = express_1.Router();
        this.routes;
    }
    ImagerController.prototype.routes = function () {
        this.router.get('/avatar-imaging/sk-:sk.hd-:hd.hn-:hn.hr-:hr.he-:he.bd-:bd.cl-:cl.act-:act.dr-:dr', function (req, res, next) {
            res.render('imager/index');
        });
    };
    return ImagerController;
}());
exports.ImagerController = ImagerController;
var Controller = new ImagerController();
Controller.routes();
exports.default = Controller.router;
