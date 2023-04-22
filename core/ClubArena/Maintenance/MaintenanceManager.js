"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameEnvironment_1 = require("../GameEnvironment");
var MaintenanceManager = /** @class */ (function () {
    function MaintenanceManager() {
    }
    MaintenanceManager.prototype.handleMaintenance = function (playerSocketID, access, noaccess) {
        // Si le jeu n'est pas en maintenance
        // OU le jeu est en maintenance mais le joueur est assez ranké
        if (GameEnvironment_1.default.getSettings().getMaintenance() == false || (GameEnvironment_1.default.getSettings().getMaintenance() == true && GameEnvironment_1.default.getPlayerManager().getPlayer(playerSocketID).getPermission().hasAccessInMaintenance())) {
            access();
            // Si le jeu est en maintenance et le joueur n'est pas assez ranké
        }
        else if (GameEnvironment_1.default.getSettings().getMaintenance() == true && GameEnvironment_1.default.getPlayerManager().getPlayer(playerSocketID).getPermission().hasAccessInMaintenance() == false) {
            noaccess();
        }
    };
    return MaintenanceManager;
}());
exports.default = MaintenanceManager;
