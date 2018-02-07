import Debug from "./Debug";

export class Loading {

    public initialize(io) {

        io.sockets.on('connection', (socket: any): any => {

            /*
            Lorsqu'on reçoit le socket de chargement {from GameController}
             */
            socket.on('loading', async () => {

                Debug.client(socket, 'Loading')

                /*
                On demande au client de draw l'écran de chargement {GameController}
                 */
                socket.emit('draw loading screen')

            })

        })

    }

}

export default new Loading;