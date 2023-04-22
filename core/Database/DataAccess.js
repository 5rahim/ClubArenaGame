"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var DataAccess = /** @class */ (function () {
    function DataAccess() {
        this.initialize();
        this.connection;
    }
    DataAccess.prototype.initialize = function () {
        // Debuter la connexion à mysql
        this.connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'lifeinlife'
        });
        // Logger
        this.connection.connect(function (err) {
            if (!err) {
                console.log("Database is connected");
            }
            else {
                console.log("Error connecting database");
            }
        });
    };
    return DataAccess;
}());
exports.DataAccess = DataAccess;
exports.default = new DataAccess;
