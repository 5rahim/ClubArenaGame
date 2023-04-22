class UI_Navbar {

    private window
    private fill: JQuery<HTMLElement>
    private animation: string;

    constructor() {

        this.window = Canvas.window
        this.fill = $('.navigation-bar-fill')
        this.animation = 'animated slideInDown'

    }

    private template() {

        return '<div class="navigation-bar '+ this.animation +'" style="width:'+ this.window.width +'px">' +
            '   <div class="navigation-bar-logo"></div>' +
            '   <div class="navigation-bar-icons">' +
            '       <li id="navigatorIcon"><div class="navigation-bar-icon"></div></li>' +
            '   </div>' +
            '</div>'

    }

    public display() {

        this.fill.html(this.template())

    }

    public onLogoClick(callback) {

        $('.navigation-bar-logo').click(() => {

            callback()

        })

    }

    public onNavigatorIconClick(callback) {

        $('#navigatorIcon').click(() => {

            callback()

        })

    }

}