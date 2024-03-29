"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserModel_1 = require("../../app/Models/UserModel");
var crypto = require('crypto');
var Door = /** @class */ (function () {
    function Door() {
        this.secret = 'uwelovesome';
    }
    Door.prototype.renderWelcome = function (req, res, registerErrors, loginErrors) {
        res.render('game/index', { loginErrors: loginErrors });
    };
    Door.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.checkBody('username', 'rUsernameEmpty').notEmpty();
                        req.checkBody('password', 'rPasswordEmpty').notEmpty();
                        errors = req.validationErrors();
                        if (!errors) return [3 /*break*/, 1];
                        // Retourner la page de connexion
                        this.renderWelcome(req, res, '', errors);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, UserModel_1.default.findBy('username', req.body.username)];
                    case 2:
                        user = _a.sent();
                        if (user) {
                            // Si les mots de passe correspondent
                            // if(bcrypt.compareSync(req.body.password, user.password)) {
                            if (true) {
                                // On initialise les sessions
                                this.initSessions(req, res, user);
                                res.redirect('/client');
                            }
                            else {
                                // Retourner la page de connexion
                                this.renderWelcome(req, res, '', [{ msg: 'rIncorrectPassword' }]);
                            }
                        }
                        else {
                            // Retourner la page de connexion
                            this.renderWelcome(req, res, '', [{ msg: 'unknowUser' }]);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Initialiser les sessions et cookies
    Door.prototype.initSessions = function (req, res, user) {
        req.session.user = user.token;
        //res.cookie('user_stoken', user.token, {maxAge: 2628000000, httpOnly: true});
    };
    Door.prototype.isAuth = function (req) {
        return req.session.user ? true : false;
    };
    Door.prototype.authRequired = function (req, res) {
        req.session.user ? res.render('game/client') : res.redirect('/');
    };
    Door.prototype.localIsAuth = function (req) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.isAuth(req) ? resolve(true) : resolve(false);
        });
    };
    // Déconnexion
    Door.prototype.logout = function (req, res) {
        // On verifie si les sessions et cookies existe
        if (this.isAuth(req)) {
            // On supprime le cookie
            //res.clearCookie('user_stoken')
            // On supprime les sessions
            req.session.destroy(function (err) { });
            // On redirige vers la page de bienvenue
            return res.redirect('/');
        }
        else {
            // On redirige vers la page de bienvenue
            return res.redirect('/');
        }
    };
    return Door;
}());
exports.Door = Door;
exports.default = new Door;
