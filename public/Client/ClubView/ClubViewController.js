///<reference path="../Canvas/Canvas.ts"/>
var ClubViewController = /** @class */ (function () {
    function ClubViewController() {
        this.window = Canvas.window;
        this.clubViewBackgroundColor = '#0cc1f6';
        this.fill = $('.clubview-fill');
    }
    ClubViewController.prototype.setViews = function (clubViews) {
        this.clubViews = clubViews;
    };
    ClubViewController.prototype.draw = function (data) {
        $('.clubview-fill').html('');
        $('.clubview-fill').css('width', this.window.width);
        $('.clubview-fill').css('height', this.window.height);
        $('.clubview-fill').css('display', 'block');
        $('.clubview-content').css('display', 'block');
        $('.clubview-content').html('<canvas id="clubview" width="' + this.window.width + '" height="' + this.window.height + '"></canvas>');
        this.clubViewCanvas = document.getElementById('clubview');
        this.clubViewCTX = this.clubViewCanvas.getContext("2d");
        // Clear
        this.clubViewCTX.clearRect(0, 0, this.window.width, this.window.height);
        // Background
        this.clubViewCTX.rect(0, 0, this.window.width, this.window.height);
        this.clubViewCTX.fillStyle = this.clubViewBackgroundColor;
        this.clubViewCTX.fill();
        /** ClubView UI **/
        $('.clubview-fill').append(this.userInfoTemplate(data));
        this.clubViewCTX.drawImage(Assets.images['clubview_background'], 0, this.window.height - 1080);
        GameController.getPlayerController().drawOnce(this.clubViewCTX, [160, this.window.height - 220], 'front', 'r', data.player.avatar.skin, data.player.avatar.head, data.player.avatar.body, data.player.avatar.clothes, data.player.avatar.hair, data.player.avatar.eyes, data.player.avatar.arms, data.player.avatar.feet);
    };
    ClubViewController.prototype.remove = function () {
        $('.clubview-fill').html('');
        $('.clubview-content').html('');
        $('.clubview-content').css('display', 'none');
        $('.clubview-fill').css('display', 'none');
        this.clubViewCTX.clearRect(0, 0, this.window.width, this.window.height);
    };
    ClubViewController.prototype.userInfoTemplate = function (data) {
        return '<div class="clubview-user-info animated bounceInUp" style="top: ' + (this.window.height - 250) + 'px; left: 160px">' +
            '<ul>' +
            '<li>Re-bienvenue, <strong>' + data.player.info.username + '</strong></li>' +
            '</ul>' +
            '</div>';
    };
    return ClubViewController;
}());
