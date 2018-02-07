export class Socketio {

    public initialize(io) {

        let users = []

        io.sockets.on('connection', (socket: any): any => {


        })

    }

}

export default new Socketio;