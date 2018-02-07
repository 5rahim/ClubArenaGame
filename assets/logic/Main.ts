///<reference path="CST.ts"/>
class MainClass {

    public canvas: any
    public ctx: CanvasRenderingContext2D
    public socket: any
    private token: string;


    constructor() {

    }

    public init() {

        this.canvas = document.getElementById(CST.data.CANVAS)
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d")

    }

    public initSocket(socket) {

        this.socket = socket

        /**
         * On debug les données venant du serveur dans la console client
         * uniquement si on est en mode développement
         */
        socket.on('debug to client', (data) => {

            if(CST.data.ENV == 'dev') {

                console.log(data)

            }

        })

    }

}

const Main = new MainClass

Main.init()

