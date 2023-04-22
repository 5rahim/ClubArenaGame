///<reference path="../Canvas/Canvas.ts"/>
class SplashScreenController {

    clubviewCanvas: JQuery<HTMLElement>
    container: JQuery<HTMLElement>

    constructor() {

        this.clubviewCanvas = $(Canvas.clubviewCanvas)
        this.container = $('.splashscreen')

    }

    
    public display() {

        this.container.append('<div class="splashscreen-background"></div>')
        this.container.append('<div class="splashscreen-logo animated pulse"></div>')

    }

    public remove() {

        this.clubviewCanvas.css('display', 'block')
        this.container.remove()

    }

}