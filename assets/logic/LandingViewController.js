///<reference path="Main.ts"/>
///<reference path="../UI/Navigationbar.ts"/>
var LandingViewControllerClass = /** @class */ (function () {
    function LandingViewControllerClass() {
    }
    LandingViewControllerClass.prototype.init = function () {
        this.LANDING_VIEW_COLOR = '#0cc1f6';
    };
    LandingViewControllerClass.prototype.draw = function (data) {
        // Clear
        Main.ctx.clearRect(0, 0, Main.canvas.width, Main.canvas.height);
        // Background
        Main.ctx.rect(0, 0, Main.canvas.width, Main.canvas.height);
        Main.ctx.fillStyle = this.LANDING_VIEW_COLOR;
        Main.ctx.fill();
        // Player
        PlayerController.drawOnce([30, Main.canvas.height - 140], 'front', 'left', data.player.avatar.skin, data.player.avatar.head, data.player.avatar.body, data.player.avatar.clothes, data.player.avatar.hair, data.player.avatar.eyes, data.player.avatar.arms, data.player.avatar.feet);
        // Navigation bar
        NavigationbarUI.init(data);
    };
    return LandingViewControllerClass;
}());
var LandingViewController = new LandingViewControllerClass();
LandingViewController.init();
