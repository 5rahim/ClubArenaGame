///<reference path="../logic/Main.ts"/>
///<reference path="Navigator.ts"/>
///<reference path="../logic/RoomController.ts"/>
var NavigationbarUIClass = /** @class */ (function () {
    function NavigationbarUIClass() {
        this.displayed = {};
    }
    NavigationbarUIClass.prototype.template = function () {
        return '<div class="navigation-bar">' +
            '   <div class="navigation-bar-logo"></div>' +
            '   <div class="navigation-bar-icons">' +
            '       <li><div class="navigation-bar-icon" id="navigatorIcon"></div></li>' +
            '   </div>' +
            '</div>';
    };
    NavigationbarUIClass.prototype.init = function (data) {
        /**
         * On affiche la barre de navigation
         */
        $('.navigation-bar-fill').html(this.template());
        /**
         * On écoute les actions liées a la barre de navigation
         */
        this.listen();
    };
    NavigationbarUIClass.prototype.listen = function () {
        /**
         * Ouvrir le navigateur
         */
        $('#navigatorIcon').click(function () {
            NavigatorUI.opened ? NavigatorUI.close() : NavigatorUI.init();
        });
        $('.navigation-bar-logo').click(function () {
            RoomController.joinLandingRoom();
        });
    };
    return NavigationbarUIClass;
}());
var NavigationbarUI = new NavigationbarUIClass();
