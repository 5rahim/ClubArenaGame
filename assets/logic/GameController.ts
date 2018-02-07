///<reference path="PlayerController.ts"/>
///<reference path="Main.ts"/>
///<reference path="LandingViewController.ts"/>
///<reference path="LoadingController.ts"/>
///<reference path="RoomController.ts"/>
class GameControllerClass {

    players: any
    rooms: any
    cameras: any

    currentRoom: any
    camera: any

    constructor() {

        this.currentRoom = {}
        this.camera = {}

    }

    public onEntrance() {

        /*
        Demander le chargement du jeu
         */
        Main.socket.emit('loading')

    }

    public loadingView() {

        /*
        Lorsqu'on recoit une demande de draw loading screen
         */
       Main.socket.on('draw loading screen', () => {

           LoadingController.draw()

       })

    }

    public landingView() {

        /*
        Lorsqu'on recoit une demande de draw landing view
         */
        Main.socket.on('draw landing view', (data) => {

            LandingViewController.draw(data)

        })

    }

    public roomView() {

        /**
         * Lorsqu'on recoit la demande de draw une room
         * on passe les données des joueurs présents dans la room
         */
        Main.socket.on('draw room', (data) => {

            /**
             * On initialise le room controller qui débutera l'animation
             */
            RoomController.init(data)
            /** RoomUI.init(data) **/

        })

        /**
         * Un utilisateur veut quitter une room
         */
        Main.socket.on('leaving room', (data) => {

            RoomController.unset(data)

        })

    }

    public listenToServerUpdate() {

        /**
         * Lorsqu'on recoit le socket d'update du server
         */
        Main.socket.on('server game state update', (data) => {

            this.players = data.players
            this.rooms = data.rooms
            this.cameras = data.cameras

        })

    }

}

const GameController = new GameControllerClass;

GameController.onEntrance()
GameController.loadingView()
GameController.landingView()
GameController.roomView()
GameController.listenToServerUpdate()
