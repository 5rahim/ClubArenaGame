///<reference path="UI_Navbar.ts"/>
///<reference path="UI_Navigator.ts"/>
///<reference path="UI_AlertMaintenance.ts"/>
class UIController {

    private navbar: UI_Navbar
    private navigator: UI_Navigator
    private alertMaintenance: UI_AlertMaintenance

    constructor() {

        this.navbar = new UI_Navbar()
        this.navigator = new UI_Navigator()
        this.alertMaintenance = new UI_AlertMaintenance()

    }

    public listen(socket) {

        // Ouvrir le navigateur
        this.getNavbar().onNavigatorIconClick(() => {

            this.getNavigator().toggle()

            //Fermer le navigateur
            this.getNavigator().onCloseClick(() => this.getNavigator().close())

            //Cliquer sur un lie<n
            this.getNavigator().onRoomClick((roomID) => {

                GameController.getEventsController().requestJoinRoom(socket, roomID)

            })

        })

        this.getNavbar().onLogoClick(() => {

            GameController.getEventsController().requestJoinClubView(socket)

        })


    }


    /** Getters **/

    public getNavbar() {
        return this.navbar
    }

    public getNavigator() {
        return this.navigator
    }

    public getAlertMaintenance() {
        return this.alertMaintenance
    }

}