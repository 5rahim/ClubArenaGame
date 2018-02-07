///<reference path="Main.ts"/>
///<reference path="PlayerController.ts"/>
///<reference path="Assets.ts"/>
class LoadingControllerClass {

    LOADING_SCREEN_LOGO;

    public init() {

        this.LOADING_SCREEN_LOGO = new Image()
        this.LOADING_SCREEN_LOGO.src = CST.data.IMAGES_PATH + 'loading_screen_logo.png'

    }

    public draw() {

        Main.ctx.beginPath();
        Main.ctx.rect(0, 0, Main.canvas.width, Main.canvas.height)
        Main.ctx.fillStyle = '#000'
        Main.ctx.fill()

        // Draw laoding screen logo
        const dstX = Main.canvas.width / 2 - this.LOADING_SCREEN_LOGO.width / 2
        const dstY = Main.canvas.height / 2 - this.LOADING_SCREEN_LOGO.height
        Main.ctx.drawImage(this.LOADING_SCREEN_LOGO, dstX, dstY)

        Main.ctx.font = "18px Arial";
        Main.ctx.textAlign = 'center';
        Main.ctx.textBaseline = 'middle';
        Main.ctx.fillStyle = "#fff"
        Main.ctx.fillText("Chargement...",Main.canvas.width / 2,Main.canvas.height / 2);
        Main.ctx.restore()

        /*
        On demande au client de charger toutes les images
         */
        Assets.loadImages(() => {

            /*
            Si les images ont été chargées
             */
            this.loaded()

        })

    }

    private loaded() {

        // On demande l'initialisation du landing view {LandingView}
        Main.socket.emit('init landing view')
        // On informe l'entrée d'un utilisateur en lui passant son token {Game}
        Main.socket.emit('incoming player', { token: PlayerController.token })

    }

}

const LoadingController = new LoadingControllerClass;

LoadingController.init()