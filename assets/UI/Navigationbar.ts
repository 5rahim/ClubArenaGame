///<reference path="../logic/Main.ts"/>
///<reference path="Navigator.ts"/>
///<reference path="../logic/RoomController.ts"/>
class NavigationbarUIClass {

    displayed: any

    constructor() {

        this.displayed = {}

    }

    private template() {

        return '<div class="navigation-bar">' +
            '   <div class="navigation-bar-logo"></div>' +
            '   <div class="navigation-bar-icons">' +
            '       <li><div class="navigation-bar-icon" id="navigatorIcon"></div></li>' +
            '   </div>' +
            '</div>'

    }

    public init(data) {

        /**
         * On affiche la barre de navigation
         */
        $('.navigation-bar-fill').html(this.template())

        /**
         * On écoute les actions liées a la barre de navigation
         */
        this.listen()

    }

    public listen() {

        /**
         * Ouvrir le navigateur
         */
        $('#navigatorIcon').click(() => {

            NavigatorUI.opened ? NavigatorUI.close() : NavigatorUI.init()

        })


        $('.navigation-bar-logo').click(() => {

            RoomController.joinLandingRoom()

        })

    }

}

const NavigationbarUI = new NavigationbarUIClass()