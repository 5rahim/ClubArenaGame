///<reference path="../Game/Assets.ts"/>
///<reference path="../Main.ts"/>
var LoadingController = /** @class */ (function () {
    function LoadingController() {
    }
    LoadingController.prototype.init = function () {
        var _this = this;
        Assets.loadImages(function () {
            _this.loaded();
        });
    };
    LoadingController.prototype.loaded = function () {
        GameController.getEventsController().gameLoaded();
    };
    return LoadingController;
}());
