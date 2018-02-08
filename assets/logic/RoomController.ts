///<reference path="PlayerController.ts"/>
class RoomControllerClass {

    public roomAnimation: any
    public animations

    constructor() {

        this.roomAnimation = {}
        this.animations = {}

    }

    /**
     * On initilialise le room controller qui va draw les rooms chaque frame
     */
    public init(data) {

        this.animate(data)

    }

    public unset(data) {

        this.unanimate(data)

    }

    /**
     * On déssine la room
     * avec les données des joueurs présents dans la room, des cameras
     * @param data
     */
    public draw(data) {

        const room = GameController.rooms[data.id]

        Main.ctx.clearRect(0,0, Main.canvas.width, Main.canvas.height)

        Main.ctx.save()

        /**
         * Draw room
         */
        this.drawRoom(room, data)

        /**
         * Draw players
         */
        for(var i = 0; i < room.playersIn.length; i++) {

            const player = room.playersIn[i]

            //test
            /**if(i == 0) {
                PlayerController.drawOnce([30,Main.canvas.height - 140], 'front', 'left', player.avatar.skin, player.avatar.head, player.avatar.body, player.avatar.clothes, player.avatar.hair,  player.avatar.eyes, player.avatar.arms, player.avatar.feet)
            } else {
                PlayerController.drawOnce([120,Main.canvas.height - 140], 'front', 'left', player.avatar.skin, player.avatar.head, player.avatar.body, player.avatar.clothes, player.avatar.hair,  player.avatar.eyes, player.avatar.arms, player.avatar.feet)
            }**/

        }

    }



    /**
     * On draw la room
     */
    public drawRoom(room, data) {

        // On récupère la camera du joueur
        const camera = GameController.cameras[data.socketid]

        // On fait une boucle pour obtenir tous les joueurs
        for(var i = 0; i < room.playersIn.length; i++) {

            const player = room.playersIn[i]

            // Pour le joueur actuel
            if(player.socketid == data.socketid) {

                let roomStartX = (Main.canvas.width / 2) - (room.background.width / 2)
                let roomStartY = (Main.canvas.height / 2) - (room.background.height / 2)
                let roomX
                let roomY

                /**
                 * On gère les positionnements
                 */
                // Si la camera du joueur n'a pas enregistré de mouvement de la room
                if(camera.currentRoomX == null || camera.currentRoomY == null) {

                    roomX = roomStartX + camera.offsetX
                    roomY = roomStartY + camera.offsetY

                    // On envoie les variables
                    Main.socket.emit('room camera update', { startX: roomStartX, startY: roomStartY, x: roomX, y: roomY, camera: camera, player: player, room: room })

                } else {

                    roomX = camera.currentRoomX + camera.offsetX / 8
                    roomY = camera.currentRoomY + camera.offsetY / 8

                    Main.socket.emit('room camera update', { startX: roomStartX, startY: roomStartY, x: roomX, y: roomY, camera: camera, player: player, room: room })

                }

                /**
                 * On déssinne les éléments en fonction de leur position
                 */

                // Room background
                Main.ctx.drawImage(Assets.images[room.image], roomX, roomY)

                PlayerController.draw(0, player, room.playersIn, camera, room)

            }

        }

    }




    /**
     * On veut rejoindre une room
     * @param id
     */
    public joinRoom(id) {

        Main.socket.emit('join room', { id: id })

    }

    /**
     * On veut quitter une room
     * @param id
     */
    public joinLandingRoom() {

        Main.socket.emit('join landing room')

    }

    /**
     * La fonction d'animation
     */
    public animate(data) {

        RoomController.draw(data)

        this.animations[data.socketid] = window.requestAnimationFrame(() => {
            RoomController.animate(data)
        })

    }

    public unanimate(data) {

        window.cancelAnimationFrame(this.animations[data.socketid])
        delete this.animations[data.socketid]

    }

}

const RoomController = new RoomControllerClass()