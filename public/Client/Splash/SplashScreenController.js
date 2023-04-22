///<reference path="../Canvas/Canvas.ts"/>
var SplashScreenController = /** @class */ (function () {
    function SplashScreenController() {
        this.clubviewCanvas = $(Canvas.clubviewCanvas);
        this.container = $('.splashscreen');
    }
    SplashScreenController.prototype.display = function () {
        this.container.append('<div class="splashscreen-background"></div>');
        this.container.append('<div class="splashscreen-logo animated pulse"></div>');
    };
    SplashScreenController.prototype.remove = function () {
        this.clubviewCanvas.css('display', 'block');
        this.container.remove();
    };
    return SplashScreenController;
}());
