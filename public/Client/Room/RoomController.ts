///<reference path="../Game/GameController.ts"/>
class RoomController {

    public window
    public roomBackgroundCanvas: any
    public roomBackgroundCTX: CanvasRenderingContext2D
    public roomAvatarLayerCanvas: any
    public roomAvatarLayerCTX: CanvasRenderingContext2D

    public rooms: any
    public animations : any

    constructor() {

        this.window = Canvas.window
        this.rooms = {}
        this.animations = {}

    }


    public initSocketRoom(socket) {

        socket.emit('init socket room')

    }

    public requestJoinRoom(callback) {

        callback()

    }



    /********************/





    /**
     * Afficher les joueurs et debuter leur animation
     * @param data
     */
    public drawPlayers(data) {

        // Afficher le canvas des players
        $('.room-container').prepend('<canvas id="roomAvatarLayer" class="room-avatar-layer" width="'+ data.room.layout.width +'px" height="'+ data.room.layout.height +'px"></canvas>')

        this.roomAvatarLayerCanvas = document.getElementById('roomAvatarLayer')
        this.roomAvatarLayerCTX = this.roomAvatarLayerCanvas.getContext("2d")
        this.roomAvatarLayerCTX.clearRect(0, 0, this.window.width, this.window.height)

        $('.room-container').draggable()

        // Demander de commencer l'animation
        this.beginDrawPlayers(this.roomAvatarLayerCTX, data.room, data.playerSocketID)

    }

    // Commencer l'animation
    public beginDrawPlayers(ctx, room, playerSocketID) {

        this.animate(ctx, room, playerSocketID)

    }

    // Fonction d'animation qui se repete chaque frame
    public animate(ctx, room, playerSocketID) {

        const entities = GameController.roomsEntities[room.id].entities
        const player = GameController.players[playerSocketID]

        // Dessiner les entities chaque frame
        GameController.getEntitiesController().drawEntities(ctx, entities, player)

        // Repeter
        this.animations[playerSocketID] = window.requestAnimationFrame(() => {
            this.animate(ctx, room, playerSocketID)
        })

    }

    public unanimate(playerSocketID) {

        window.cancelAnimationFrame(this.animations[playerSocketID])
        delete this.animations[playerSocketID]

    }





    /*****************************/


    public removePlayers(data) {

        this.unanimate(data.player.info.socketID)

    }

    public removeRoom() {

        $('.room-content').css('display', 'none')
        $('.room-content').html('')

    }




    /*******************************/





    public displayBackground(data) {

        /** Set content **/
        $('.room-content').css('display', 'block')
        $('.room-content').css('width', this.window.width)
        $('.room-content').css('height', this.window.height)

        /** set room container **/
        $('.room-content').html('<div class="room-container" style="position: absolute;"></div>')
        $('.room-container').css('bottom', (this.window.height - data.room.layout.height) / 2)
        $('.room-container').css('left', (this.window.width - data.room.layout.width) / 2)
        $('.room-container').css('width', data.room.layout.width)
        $('.room-container').css('height', data.room.layout.height)

        /** Set the background **/
        $('.room-container').append('<canvas id="roomBackground" class="room-background" width="'+ data.room.layout.width +'px" height="'+ data.room.layout.height +'px"></canvas>')
        $('.room-content').append('<div class="room-background-color"></div>')
        $('.room-background-color').css('background-color', '#000')
        setInterval(() => {
            $('.room-background-color').css('background-color', data.room.background_color)
        }, 500)
        this.roomBackgroundCanvas = document.getElementById('roomBackground')
        this.roomBackgroundCTX = this.roomBackgroundCanvas.getContext("2d")
        this.roomBackgroundCTX.clearRect(0, 0, this.window.width, this.window.height)
        this.roomBackgroundCTX.drawImage(Assets.images[data.room.image], 0, 0)

    }









    /** Setters **/


    /** Getters **/

}