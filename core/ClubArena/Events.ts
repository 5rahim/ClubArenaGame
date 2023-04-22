import GameEnvironment from "./GameEnvironment";
import UserModel from "../../app/Models/UserModel";
import AvatarModel from "../../app/Models/AvatarModel";
import Player from "./Player/Player";
import ClubView from "./ClubView/ClubView";
import Debug from "../Tools/Debug";

export default class Events {

    /** Envoyer un evenement **/

    /**
     * Initialiser le splash screen
     * @param io
     * @param socket
     */
    public initSplashScreen(io, socket) {

        GameEnvironment.getSplashScreenManager().init(socket)

    }

    public sendState(socket) {

        setInterval(() => {

            socket.emit('server game state update', {
                players: GameEnvironment.getPlayerManager().getPlayers(),
                clubViews: GameEnvironment.getClubViewManager().getViews(),
                rooms: GameEnvironment.getRoomManager().getRooms(),
                roomsEntities: GameEnvironment.getRoomManager().getRoomsEntities()
            })

        }, GameEnvironment.getFrameRate())

    }





    /** Traiter un evenement reçu **/

    /**
     * Lorsque le joueur arrive
     * @param io
     * @param socket
     */
    public incomingPlayer(io, socket) {

        // Lorsque le client informe de l'entrée du joueur
        socket.on('incoming player', async (data) => {

            const player = await UserModel.findBy('token', data.token)
            const playerAvatar = await AvatarModel.findBy('user_token', data.token)

            GameEnvironment.getPlayerManager().addPlayer(new Player({ player: player, avatar: playerAvatar }, socket.id))

            GameEnvironment.getClubViewManager().addView(new ClubView(GameEnvironment.getPlayerManager().getPlayer(socket.id)))

            Debug.client(io, 'Player connected', 'all')
            Debug.client(io, GameEnvironment.getPlayerManager().getPlayers(), 'all')

            // Initialiser le jeu
            const playerSocketID = socket.id

            GameEnvironment.getMaintenanceManager().handleMaintenance(playerSocketID, () => {

                socket.emit('init game', {
                    playerSocketID: playerSocketID as string,
                    clubView: GameEnvironment.getClubViewManager().getView(playerSocketID) as ClubView,
                    player: GameEnvironment.getPlayerManager().getPlayer(playerSocketID) as Player
                })

            }, () => {

                socket.emit('alert maintenance', {})

            })

        })

    }

    /**
     * Lorsque le joueur part
     * @param io
     * @param socket
     */
    public outgoingPlayer(io, socket) {

        socket.on('disconnect', () => {

            const player = GameEnvironment.getPlayerManager().getPlayer(socket.id)

            if(player && socket.id) {

                GameEnvironment.getRoomManager().leaveEverywhere(socket.id)
                GameEnvironment.getPlayerManager().removePlayer(socket.id)
                GameEnvironment.getClubViewManager().removeView(socket.id)

            }

        })

    }

    /**
     * On fait entrer le player dans sa room par défaut (View)
     * @param io
     * @param socket
     */
    public initSocketRoom(io, socket) {

        if(socket.id) {

            socket.on('init socket room', () => {

                const playerSocketID = socket.id

                GameEnvironment.getPlayerManager().getPlayer(playerSocketID).setCurrentRoom(socket.id)

                socket.join(socket.id)

            })

        }

    }

    /**
     * Lorsque le player demande a rejoindre une room
     * @param io
     * @param socket
     */
    public requestJoinRoom(io, socket) {

        if(socket.id) {

            socket.on('request join room', (data: any) => {

                Debug.client(socket, 'Request join room ' + data.roomID)

                GameEnvironment.getRoomManager().joinRoom(io, socket, socket.id, data.roomID)

            })

        }

    }


    /**
     * Lorsque le player demande a rejoindre le clubview
     * @param io
     * @param socket
     */
    public requestJoinClubView(io, socket) {

        if(socket) {

            socket.on('request join club view', () => {

                Debug.client(socket, 'Request join club view')

                GameEnvironment.getRoomManager().joinClubView(io, socket, socket.id)

            })

        }

    }






}