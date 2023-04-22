///<reference path="UI_Navbar.ts"/>
///<reference path="UI_Navigator.ts"/>
///<reference path="UI_AlertMaintenance.ts"/>
var UIController = /** @class */ (function () {
    function UIController() {
        this.navbar = new UI_Navbar();
        this.navigator = new UI_Navigator();
        this.alertMaintenance = new UI_AlertMaintenance();
    }
    UIController.prototype.listen = function (socket) {
        var _this = this;
        // Ouvrir le navigateur
        this.getNavbar().onNavigatorIconClick(function () {
            _this.getNavigator().toggle();
            //Fermer le navigateur
            _this.getNavigator().onCloseClick(function () { return _this.getNavigator().close(); });
            //Cliquer sur un lie<n
            _this.getNavigator().onRoomClick(function (roomID) {
                GameController.getEventsController().requestJoinRoom(socket, roomID);
            });
        });
        this.getNavbar().onLogoClick(function () {
            GameController.getEventsController().requestJoinClubView(socket);
        });
    };
    /** Getters **/
    UIController.prototype.getNavbar = function () {
        return this.navbar;
    };
    UIController.prototype.getNavigator = function () {
        return this.navigator;
    };
    UIController.prototype.getAlertMaintenance = function () {
        return this.alertMaintenance;
    };
    return UIController;
}());
