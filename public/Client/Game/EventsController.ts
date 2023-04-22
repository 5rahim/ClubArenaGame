///<reference path="GameController.ts"/>

class EventsController {

    /** Traiter les evenements **/

    /**
     * Mettre a jour chaque frame les informations au niveau du client
     */
    public listenToServerUpdate(socket) {

        socket.on('server game state update', (data) => {

            GameController.players = data.players
            GameController.rooms = data.rooms
            GameController.roomsEntities = data.roomsEntities

        })

    }



    /**
     * Lorsque le serveur demande de charger le jeu
     * @param socket
     */
    public listenLoadGame(socket) {

        socket.on('load game', () => {

            // On initialise le player controller
            GameController.setPlayerController(socket.id, Main.token)

            // On affiche le splash screen
            GameController.getSplashScreenController().display()

            // On charge le jeu
            GameController.getLoadingController().init()

        })

    }

    /**
     * Lorsque le serveur demander d'initialiser le jeu
     * @param socket
     */
    public listenInitGame(socket) {

        // data = { playerSocketID, clubView, player }
        socket.on('init game', (data) => {

            // On retire le splash screen
            GameController.getSplashScreenController().remove()

            // On affiche la navbar
            GameController.getUIController().getNavbar().display()

            // On écoute l'UI
            GameController.getUIController().listen(socket)

            // On initialise les socket rooms
            GameController.getRoomController().initSocketRoom(socket)

            // On dessine le club view
            GameController.getClubViewController().draw(data)

        })

    }

    /**
     * Lorsqu'on reçoit l'alerte de maintenance
     * @param socket
     */
    public listenAlertMaintenance(socket) {

        socket.on('alert maintenance', () => {

            GameController.getUIController().getAlertMaintenance().display()

        })

    }

    public listenJoinClubView(socket) {

        socket.on('join club view', (data) => {

            GameController.getRoomController().removePlayers(data)
            GameController.getRoomController().removeRoom()

            // On dessine le club view
            GameController.getClubViewController().draw(data)

        })

    }


    public listenRemoveClubView(socket) {

        socket.on('remove club view', () => {

            GameController.getClubViewController().remove()

        })

    }


    /**
     * Gestion des rooms
     * @param socket
     */
    public listenUpdateRoom(socket) {


        // Afficher la room { room, player }
        socket.on('draw room', (data) => {

            // On retire le clubview
            GameController.getClubViewController().remove()

            // On affiche le background et autres elements qui se repetent pas
            GameController.getRoomController().displayBackground(data)
            /*****************/

            GameController.getRoomController().drawPlayers(data)

        })

    }











    /** Envoyer des evenements **/

    /**
     * Si le jeu est chargé
     */
    public gameLoaded() {

        Main.socket.emit('incoming player', {
            token: <string>GameController.getPlayerController().getToken()
        })

    }


    /**
     * Demander au serveur de rejoindre une room
     * @param socket
     * @param roomID
     */
    public requestJoinRoom(socket, roomID) {

        GameController.getRoomController().requestJoinRoom(() => {

            socket.emit('request join room', { roomID: roomID })

        })

    }

    /**
     * Demander au serveur de repartir sur le clubview
     * @param socket
     */
    public requestJoinClubView(socket) {

        socket.emit('request join club view')

    }




}