var UI_AlertMaintenance = /** @class */ (function () {
    function UI_AlertMaintenance() {
        this.window = Canvas.window;
        this.fill = $('.alertmaintenance');
    }
    UI_AlertMaintenance.prototype.display = function () {
        this.fill.css('display', 'flex');
        this.fill.css('width', this.window.width + 'px');
        this.fill.css('height', this.window.height + 'px');
        $('.splashscreen-logo').remove();
        this.fill.html('<div class="alertmaintenance-box animated tada">' +
            '<div class="alertmaintenance-title">Alerte de ClubArena</div>' +
            '<div class="alertmaintenance-info">Rien de grave cher joueur. Nous sommes en train d\'effectuer quelques modifications au serveur du jeu. Nous reviendrons dans les plus bref delais</div>' +
            '</div>');
    };
    return UI_AlertMaintenance;
}());
