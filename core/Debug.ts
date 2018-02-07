export class Debug {

    public client(socket, thing, to?, room?) {

        if(to) {

            if(to == 'all') {
                socket.sockets.emit('debug to client', thing)
            } else if (to == 'room') {
                socket.sockets.in(room).emit('debug to client', thing)
            }

        } else {
            socket.emit('debug to client', thing)
        }

    }

}

export default new Debug;