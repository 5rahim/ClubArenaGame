"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var csrf = require("csurf");
var compression = require("compression");
var logger = require("morgan");
var helmet = require("helmet");
var cors = require("cors");
var path = require("path");
var expressValidator = require("express-validator");
var session = require("express-session");
var flash = require("connect-flash");
// Core/App
var Config_1 = require("./core/Configuration/Config");
var DataAccess_1 = require("./core/Database/DataAccess");
var View_1 = require("./core/Site/View");
var Routes_1 = require("./app/Routes");
// Process ENV
process.env.BASE = __dirname + '/';
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        Config_1.default.start();
        // MySQL Database initialization
        DataAccess_1.default.initialize();
        // View initialization
        View_1.default.initialize(this.app, path);
        // Middleware
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(csrf({ cookie: true }));
        this.app.use(expressValidator());
        // this.app.use(sassMiddleware({
        //     src: path.join(__dirname, 'public'),
        //     dest: path.join(__dirname, 'public'),
        //     indentedSyntax: false, // true = .sass and false = .scss
        //     sourceMap: true
        // }));
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(express.static(path.join(__dirname, 'node_modules')));
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(session({
            secret: 'redbeardisthebest',
            resave: false,
            saveUninitialized: false,
            cookie: { expires: 2628000000 }
        }));
        this.app.use(function (req, res, next) {
            //Door.checkSessionAndCookie(req, res, next)
            next();
        });
        this.app.use(flash());
        //this.app.use(i18n.init);
        // Cors
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', 'http://localhost:4004');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    };
    Server.prototype.routes = function () {
        // All Routes
        Routes_1.default.initialize(this.app);
    };
    return Server;
}());
exports.default = new Server().app;
