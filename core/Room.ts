import RoomModel from "../app/Models/RoomModel";
import DB from "./DataAccess";
import Debug from "./Debug";
import Game from "./Game";

export class Rooms {




    public initialize(io) {

        io.sockets.on('connection', (socket: any): any => {

            /**
             * Lorsqu'un joueur veut rejoindre une room
             */
            socket.on('join room', (data) => {

                Debug.client(io, socket.id + ' wants to join room: ' + data.id, 'all')

                this.joinRoom(io, socket, data.id)

            })


            /**
             * Lorsqu'un joueur veut quitter une room
             */
            socket.on('join landing room', () => {

                this.joinLandingRoom(io, socket, Game.players)

            })

        })

    }






    /**
     * Faire rentrer un joueur dans une room
     * On lui fait quitter sa room actuelle
     * puis re-rentrer dans une nouvelle room
     * @param io
     * @param socket
     * @param id
     */
    public joinRoom(io, socket, id) {

        const players = Game.players
        const cameras = Game.cameras
        const rooms = Game.rooms

        if(players[socket.id]) {

            this.leaveRoom(players[socket.id].currentRoom, socket, players, rooms)

            // On change la current room du joueur
            players[socket.id].currentRoom = id
            // On ajoute le joueur dans la liste des joueurs présents dans la room
            rooms[id].playersIn.push(players[socket.id])

        }

        /**
         * On log les informations de la room au client
         */
        Debug.client(socket, rooms[id])

        socket.join(id)

        /**
         * On demande a draw la room
         * en passant les données de la room
         * et les données de la camera du joueur
         */
        //  Limitation du nombre de personnes
        if(rooms[id].max_users > rooms[id].playersIn.length) {

            //io.sockets.in(id).emit('draw room', { id: id, socketid: socket.id })
            socket.emit('draw room', { id: id, socketid: socket.id })

        } else {

            /** Envoyer une alerte pour signaler le manque de place au player **/

            this.joinLandingRoom(io, socket, players)

        }

    }






    /**
     * Quitter une room
     * @param id
     * @param socket
     * @param players
     * @param rooms
     */
    public leaveRoom(id, socket, players, rooms) {

        /**
         * On informe le client que le player quitte la room
         */
        socket.emit('leaving room', { id: id, socketid: socket.id })

        socket.leave(players[socket.id].currentRoom)

        // Retirer le player de la room actuelle
        // Parties inutiles mais c'est comme ça

        for(var i = 0; i < rooms[id].playersIn.length; i++) {

            // Si il y a une room dans laquelle le player se trouve
            // On le retire de cette room
            if(rooms[id].playersIn[i].socketid == socket.id) {

                rooms[id].playersIn = rooms[id].playersIn.filter(item => item !== rooms[id].playersIn[i])

            }

        }


        Debug.client(socket, 'You are leaving ' + rooms[id].id)
        Debug.client(socket, rooms)

    }






    /**
     * On met toutes les rooms dans la variable globale
     * @param rooms
     */
    public setRooms(rooms) {

        DB.connection.query('SELECT * FROM rooms', (err, rows) => {

            if(err)
                return {}

            if(rows) {

                for(var k in rows) {

                    const room = rows[k]
                    rooms[room.id] = {
                        id: room.id,
                        owner_token: room.owner_token,
                        name: room.name,
                        max_users: room.max_users,
                        background_color: room.background_color,
                        image: room.image,
                        background: {
                            width: room.background_width,
                            height: room.background_height,
                        },
                        landing: false,
                        isPublic: room.isPublic,
                        playersIn: [],
                        door: {
                            x: room.door_x,
                            y: room.door_y
                        }
                    }

                }

            } else {
                return {}
            }

        });

    }

    /**
     * On ajouter la landing view de l'utilisateur
     * dans la variable globale
     * @param socket
     * @param player
     * @returns {Promise<any> | Promise}
     */
    public setLandingRoom(socket, player) {

        return new Promise(async (resolve, reject) => {

            const data = {
                id: socket.id,
                landing: true,
                playersIn: [ player ]
            }
            resolve(data)

        })

    }

    /**
     * On fait rentrer le joueur dans une room personnelle (landing view)
     */
    public joinLandingRoom(io, socket, players) {

        const rooms = Game.rooms

        // Si la current room du player n'est pas la landing view
        // Sinon pas besoin de quitter tel room
        if(players[socket.id] !== undefined) {

            if(players[socket.id].currentRoom !== socket.id) {

                // On lui fait quitter la room dans laquelle il est
                this.leaveRoom(players[socket.id].currentRoom, socket, players, rooms)

                // On change la current room du joueur
                players[socket.id].currentRoom = socket.id
                // On ajoute le joueur dans sa landing view
                Game.rooms[socket.id].playersIn = [ players[socket.id] ]

            }

        }

        const landingRoom = socket.id

        socket.join(landingRoom)

        // On demande a draw le landing view pour le joueur actuel uniquement
        io.sockets.in(landingRoom).emit('draw landing view', { player: players[socket.id] })

    }

}

export default new Rooms()