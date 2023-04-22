import ClubViewManager from "./ClubView/ClubViewManager";
import SplashScreenManager from "./Splash/SplashScreenManager";
import PlayerManager from "./Player/PlayerManager";
import Debug from "../Tools/Debug";
import ClubView from "./ClubView/ClubView";
import Player from "./Player/Player";
import UserModel from "../../app/Models/UserModel";
import AvatarModel from "../../app/Models/AvatarModel";
import Events from "./Events";
import RoomManager from "./Room/RoomManager";
import Settings from "./Settings/Settings";
import MaintenanceManager from "./Maintenance/MaintenanceManager";

export class GameEnvironment {

    private frameRate = 1000.0 / 30.0

    private settings: Settings
    private events: Events
    private playerManager: PlayerManager
    private clubViewManager: ClubViewManager
    private splashScreenManager: SplashScreenManager
    private maintenanceManager: MaintenanceManager
    private roomManager: RoomManager

    public initialize(io) {

        this.settings = new Settings()
        this.settings.init().then()
        this.events = new Events()
        this.maintenanceManager = new MaintenanceManager()
        this.clubViewManager = new ClubViewManager()
        this.splashScreenManager = new SplashScreenManager()
        this.playerManager = new PlayerManager()
        this.roomManager = new RoomManager()

        // Charger les rooms
        this.getRoomManager().loadRooms(io)

        // Lorsqu'un joueur se connecte
        io.sockets.on('connection', (socket) => {



            /**
             * Demarrer des evenements
             */
            this.events.initSplashScreen(io, socket)



            /**
             * Evenements venant du client
             */

            this.events.sendState(socket)
            this.events.incomingPlayer(io, socket)
            this.events.initSocketRoom(io, socket)
            this.events.requestJoinRoom(io, socket)
            this.events.requestJoinClubView(io, socket)
            this.events.outgoingPlayer(io, socket)

        })

    }

    public getPlayerManager() {

        return this.playerManager

    }

    public getClubViewManager() {

        return this.clubViewManager

    }

    public getRoomManager() {

        return this.roomManager

    }

    public getMaintenanceManager() {

        return this.maintenanceManager

    }

    public getSplashScreenManager() {

        return this.splashScreenManager

    }

    public getFrameRate() {

        return this.frameRate

    }

    public getSettings() {

        return this.settings

    }

}

export default new GameEnvironment