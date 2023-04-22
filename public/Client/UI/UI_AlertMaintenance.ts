class UI_AlertMaintenance {

    private window
    private fill: JQuery<HTMLElement>

    constructor() {

        this.window = Canvas.window
        this.fill = $('.alertmaintenance')

    }

    public display() {

        this.fill.css('display', 'flex')
        this.fill.css('width', this.window.width + 'px')
        this.fill.css('height', this.window.height + 'px')

        $('.splashscreen-logo').remove()

        this.fill.html('<div class="alertmaintenance-box animated tada">' +
            '<div class="alertmaintenance-title">Alerte de ClubArena</div>' +
            '<div class="alertmaintenance-info">Rien de grave cher joueur. Nous sommes en train d\'effectuer quelques modifications au serveur du jeu. Nous reviendrons dans les plus bref delais</div>' +
            '</div>')

    }

}