import Debug from "../../Tools/Debug";

export default class SplashScreenManager {

    public init(socket) {

        socket.on('loading', () => {

            Debug.client(socket, 'ClubArena is loading')

            socket.emit('load game')

        })

    }

}