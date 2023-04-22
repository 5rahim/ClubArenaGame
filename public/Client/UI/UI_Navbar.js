var UI_Navbar = /** @class */ (function () {
    function UI_Navbar() {
        this.window = Canvas.window;
        this.fill = $('.navigation-bar-fill');
        this.animation = 'animated slideInDown';
    }
    UI_Navbar.prototype.template = function () {
        return '<div class="navigation-bar ' + this.animation + '" style="width:' + this.window.width + 'px">' +
            '   <div class="navigation-bar-logo"></div>' +
            '   <div class="navigation-bar-icons">' +
            '       <li id="navigatorIcon"><div class="navigation-bar-icon"></div></li>' +
            '   </div>' +
            '</div>';
    };
    UI_Navbar.prototype.display = function () {
        this.fill.html(this.template());
    };
    UI_Navbar.prototype.onLogoClick = function (callback) {
        $('.navigation-bar-logo').click(function () {
            callback();
        });
    };
    UI_Navbar.prototype.onNavigatorIconClick = function (callback) {
        $('#navigatorIcon').click(function () {
            callback();
        });
    };
    return UI_Navbar;
}());
