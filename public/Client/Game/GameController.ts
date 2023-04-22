///<reference path="../Main.ts"/>
///<reference path="../Splash/SplashScreenController.ts"/>
///<reference path="EventsController.ts"/>
///<reference path="../Splash/LoadingController.ts"/>
///<reference path="../ClubView/ClubViewController.ts"/>
///<reference path="../Room/RoomController.ts"/>
///<reference path="../Player/PlayerController.ts"/>
///<reference path="../Entities/EntitiesController.ts"/>
///<reference path="../Game/EventsController.ts"/>
///<reference path="../UI/UIController.ts"/>
class _GameController {

    public clubViews
    public rooms
    public players
    public roomsEntities

    private eventsController: EventsController
    private splashScreenController: SplashScreenController
    private loadingController: LoadingController
    private playerController: PlayerController
    private entitiesController: EntitiesController
    private clubViewController: ClubViewController
    private roomController: RoomController
    private UIController: UIController

    public start() {

        Main.socket.emit('loading')

        this.eventsController = new EventsController()
        this.splashScreenController = new SplashScreenController()
        this.loadingController = new LoadingController()
        this.clubViewController = new ClubViewController()
        this.roomController = new RoomController()
        this.entitiesController = new EntitiesController()
        this.UIController = new UIController()

        /**
         * Evenements venant du serveur
         */
        this.eventsController.listenToServerUpdate(Main.socket)
        this.eventsController.listenLoadGame(Main.socket)
        this.eventsController.listenAlertMaintenance(Main.socket)
        this.eventsController.listenInitGame(Main.socket)
        this.eventsController.listenJoinClubView(Main.socket)
        this.eventsController.listenRemoveClubView(Main.socket)
        this.eventsController.listenUpdateRoom(Main.socket)

    }

    public setPlayerController(socketID, token) {
        this.playerController = new PlayerController(socketID, token)
    }

    public getEventsController() {
        return this.eventsController
    }

    public getUIController() {
        return this.UIController
    }

    public getClubViewController() {
        return this.clubViewController
    }

    public getRoomController() {
        return this.roomController
    }

    public getPlayerController() {
        return this.playerController
    }

    public getEntitiesController() {
        return this.entitiesController
    }

    public getSplashScreenController() {
        return this.splashScreenController
    }

    public getLoadingController() {
        return this.loadingController
    }


    public getViews() {
        return this.clubViews
    }

}

const GameController = new _GameController()

GameController.start()