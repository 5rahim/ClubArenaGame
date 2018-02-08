import Game from "./Game";

export class Camera {

    defaultX: number;
    defaultY: number;

    constructor() {

        this.defaultX = 0
        this.defaultY = 0

    }

    public initialize(io) {

        io.sockets.on('connection', (socket: any): any => {

            socket.on('camera update', (data) => {

                if(Game.cameras[data.socketid] !== undefined) {

                    Game.cameras[data.socketid].offsetX = data.offsetX
                    Game.cameras[data.socketid].offsetY = data.offsetY

                }


            })

            socket.on('stop camera update', (data) => {

                if(Game.cameras[data.socketid] !== undefined) {

                    Game.cameras[data.socketid].offsetX = 0
                    Game.cameras[data.socketid].offsetY = 0

                }

            })

            /**
             * Update la position actuelle d'une room
             */
            socket.on('room camera update', (data) => {

                if(Game.cameras[data.player.socketid] !== undefined) {

                    if(data.startX !== data.x || data.startY !== data.y) {

                        Game.cameras[data.player.socketid].currentRoomX = data.x
                        Game.cameras[data.player.socketid].currentRoomY = data.y

                    } else {

                        Game.cameras[data.player.socketid].currentRoomX = null
                        Game.cameras[data.player.socketid].currentRoomY = null

                    }

                }

            })


            socket.on('players camera update', (data) => {

                if(Game.cameras[data.player.socketid]) {

                    if(data.startX !== data.x || data.startY !== data.y) {

                        Game.cameras[data.player.socketid].currentPlayersX = data.x
                        Game.cameras[data.player.socketid].currentPlayersY = data.y

                    } else {

                        Game.cameras[data.player.socketid].currentPlayersX = null
                        Game.cameras[data.player.socketid].currentPlayersY = null

                    }

                }

            })

        })

    }

    public setCamera(socketid) {

        return new Promise(async (resolve, reject) => {

            const data = {
                socketid: socketid,
                offsetX: this.defaultX,
                offsetY: this.defaultY,
                currentRoomX: null,
                currentRoomY: null,
                currentPlayersX: null,
                currentPlayersY: null,
                currentFurnituresRoomX: null,
                currentFurnituresRoomY: null
            }
            resolve(data)

        })


    }

}

export default new Camera()