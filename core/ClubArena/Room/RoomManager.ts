import Room from "./Room";
import DB from "../../Database/DataAccess";
import GameEnvironment from "../GameEnvironment";
import Debug from "../../Tools/Debug";
import PlayerRoom from "../Player/PlayerRoom";
import RoomEntities from "./RoomEntities";

export default class RoomManager {

    private rooms
    private roomsEntities

    public constructor() {

        this.rooms = {}
        this.roomsEntities = {}

    }


    /**
     * Quitter une room
     * @param socket
     * @param roomID
     * @param player
     */
    public leaveRoom(socket, roomID, player) {

        if(socket) {

            if(player) {

                const roomToLeave = GameEnvironment.getRoomManager().getRoom(roomID)

                if(roomToLeave) {

                    if(roomID != socket.id) {

                        roomToLeave ? GameEnvironment.getRoomManager().getRoomEntities(roomID).removeEntity(socket.id) : null

                    }

                }

            }

        }

    }

    public leaveEverywhere(playerSocketID) {

        for(var k in GameEnvironment.getRoomManager().getRooms()) {

            if(GameEnvironment.getRoomManager().getRoomEntities(k).entityInRoom(playerSocketID)) {

                GameEnvironment.getRoomManager().getRoomEntities(k).removeEntity(playerSocketID)

            }

        }

    }


    /**
     *
     * @param io
     * @param socket
     * @param {string} playerSocketID
     */
    public joinClubView(io, socket, playerSocketID: string) {

        if(socket) {

            const player = GameEnvironment.getPlayerManager().getPlayer(playerSocketID)
            const currentRoom = player ? GameEnvironment.getPlayerManager().getPlayer(playerSocketID).getCurrentRoom() : null

            if(player && currentRoom) {

                this.leaveRoom(socket, currentRoom, player)

                GameEnvironment.getPlayerManager().getPlayer(playerSocketID).setCurrentRoom(playerSocketID)

                socket.emit('join club view', {
                    player: GameEnvironment.getPlayerManager().getPlayer(playerSocketID)
                })

            }

        }

    }



    /**
     * Rejoindre une room
     * @param io
     * @param socket
     * @param {string} playerSocketID
     * @param {number} roomID
     */
    public joinRoom(io, socket, playerSocketID: string, roomID: number) {

        if(socket) {


            // Verifier si la room est bloqué
            // Verifier que le joueur n'est pas banni
            // Verifier que le room n'est pas pleine

            const room = GameEnvironment.getRoomManager().getRoom(roomID)
            const player = GameEnvironment.getPlayerManager().getPlayer(playerSocketID)

            if(room && player) {


                if((player.getPermission().hasAccessAnyRoom() == true && room.getState() == 'LOCKED') || (room.getState() == 'OPEN')) {

                    //if((player.getPermission().hasAccessAnyRoom() == true && room.getEntitysCount() >= room.getUserMax() ) || (room.getEntitysCount() < room.getUserMax())) {


                        /** Quitter l'ancienne room **/
                        GameEnvironment.getRoomManager().leaveRoom(socket, player.getCurrentRoom(), player)
                        /******************************/


                        /** Changements et ajout dans la nouvelle room **/
                        socket.join(roomID)
                        GameEnvironment.getPlayerManager().getPlayer(playerSocketID).setCurrentRoom(roomID)

                        GameEnvironment.getRoomManager().getRoomEntities(roomID).addEntity(
                            'player',
                            playerSocketID,
                            new PlayerRoom({ socketID: playerSocketID, username: player.getInfo().getUsername() }, player.getAvatar(), player.getSelf())
                        )

                        GameEnvironment.getRoomManager().getRoomEntities(roomID).getEntity(playerSocketID).getSelf().setFlip('r')
                        GameEnvironment.getRoomManager().getRoomEntities(roomID).getEntity(playerSocketID).getSelf().setDirection('front')
                        const defaultYAndIndex = Math.random() * room.getLayout().getDoorY()
                        GameEnvironment.getRoomManager().getRoomEntities(roomID).getEntity(playerSocketID).getSelf().setIndex(defaultYAndIndex)
                        GameEnvironment.getRoomManager().getRoomEntities(roomID).getEntity(playerSocketID).getSelf().setInitialPosition([room.getLayout().getDoorX(), defaultYAndIndex])
                        /*********************************/


                        /** Commencer a dessiner **/
                        socket.emit('draw room', {
                            playerSocketID: playerSocketID,
                            room: room
                        })

                        Debug.client(io, GameEnvironment.getRoomManager().getRoomEntities(roomID), 'room', roomID)



                    /*} else if ((player.getPermission().hasAccessAnyRoom() == false && room.getEntitysCount() >= room.getUserMax())) {

                        // Si la room est pleine
                        Debug.client(socket, 'Room is full')


                    }*/


                } else if(player.getPermission().hasAccessAnyRoom() == false && room.getState() == 'LOCKED') {

                    // Si la room est bloquée
                    Debug.client(socket, 'Room is closed')

                }


            }


        }

    }







    /** Setters **/
    public loadRooms(io) {

        DB.connection.query('SELECT * FROM rooms', (err, rows) => {

            if(err)
                return

            if(rows) {

                for (let i = 0; i < rows.length; i++) {

                    let row = rows[i]

                    this.addRoom(new Room(row), new RoomEntities())

                }

            }

        })

    }

    public addRoom(room: Room, roomEntities: RoomEntities) {

        this.rooms[room.getID()] = room
        this.roomsEntities[room.getID()] = roomEntities

    }

    /** Getters **/

    public getRoom(roomID: number | string) {

        return this.rooms[roomID]

    }

    public getRoomEntities(roomID) {

        return this.roomsEntities[roomID]

    }

    public getRooms() {

        return this.rooms

    }

    public getRoomsEntities() {

        return this.roomsEntities

    }

}