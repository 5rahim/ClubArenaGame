import Debug from "./Debug";

export class LandingView {

    public initialize(io) {

        io.sockets.on('connection', (socket: any): any => {

            /*
            Lorsqu'on reçoit le socket d'initialisation {from LoadingController}
             */
            socket.on('init landing view', () => {

                /*
                On demande au client de draw le landing view {GameController}
                 */
                //socket.emit('draw landing view')

            })

        })

    }

}

export default new LandingView;