import HashMap from 'hashmap'
import Player from "./Player";
import Debug from "./Debug";
import Room from "./Room";
import Camera from "./Camera";

export class Game {

    players: any
    rooms: any
    cameras: any
    clients: any
    frame_rate: number

    constructor() {

        this.players = {}
        this.rooms = {}
        this.cameras = {}
        this.clients = {}
        this.frame_rate = 1000.0 / 30.0

    }

    public initialize(io) {

        /**
         * On initilialise les rooms dans la variable globale
         */
       Room.setRooms(this.rooms)

        io.sockets.on('connection', (socket: any): any => {

            /**
             * Lorsqu'un joueur entre dans le jeu {from LoadingController}
             */
            socket.on('incoming player', async (data) => {

                Debug.client(socket, 'Game loaded')

                /**
                 * On l'initialise
                 */

                // On ajoute le joueur
                this.players[socket.id] = await Player.setPlayer(socket.id, data.token)

                // On ajoute la camera
                this.cameras[socket.id] = await Camera.setCamera(socket.id)

                // On ajoute le landing view
                this.rooms[socket.id] = await Room.setLandingRoom(socket, this.players[socket.id])

                /**
                 * Debug au client
                 */
                Debug.client(io, 'User joined', 'all')
                Debug.client(io, this.players[socket.id], 'all')
                Debug.client(io, 'Rooms', 'all')
                Debug.client(io, this.rooms, 'all')

                /**
                 * On initialise le landing view propre à l'utilisateur
                 */
                Room.joinLandingRoom(io, socket, this.players)

            })

            /**
             * Quand le joueur quitte la page, on le supprime
             */
            socket.on('disconnect', () => {

                if(this.players[socket.id] !== undefined) {
                    Room.leaveRoom(this.players[socket.id].currentRoom, socket, this.players, this.rooms)
                    delete this.players[socket.id]
                }
                delete this.rooms[socket.id]
                delete this.cameras[socket.id]

            })

            /**
             * On update le serveur chaque frame
             * avec les données des players vers le client
             */
            setInterval(() => {

                this.updateStateToClient(socket)

            }, this.frame_rate)

        })

    }

    /**
     * On envoie les données au client
     * @param socket
     */
    private updateStateToClient(socket) {

        socket.emit('server game state update', { players: this.players, rooms: this.rooms, cameras: this.cameras })

    }

}

export default new Game;