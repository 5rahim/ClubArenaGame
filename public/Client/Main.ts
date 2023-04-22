///<reference path="CST.ts"/>
class _Main {

    public socket: any
    public token: string;

    public initSocket(socket) {

        this.socket = socket

        socket.on('debug to client', (data) => {

            if(CST.data.ENV == 'dev') {

                console.log(data)

            }

        })

    }

    public initToken(token) {

        this.token = token

    }

}

const Main = new _Main()

