///<reference path="GameController.ts"/>
var EventsController = /** @class */ (function () {
    function EventsController() {
    }
    /** Traiter les evenements **/
    /**
     * Mettre a jour chaque frame les informations au niveau du client
     */
    EventsController.prototype.listenToServerUpdate = function (socket) {
        socket.on('server game state update', function (data) {
            GameController.players = data.players;
            GameController.rooms = data.rooms;
            GameController.roomsEntities = data.roomsEntities;
        });
    };
    /**
     * Lorsque le serveur demande de charger le jeu
     * @param socket
     */
    EventsController.prototype.listenLoadGame = function (socket) {
        socket.on('load game', function () {
            // On initialise le player controller
            GameController.setPlayerController(socket.id, Main.token);
            // On affiche le splash screen
            GameController.getSplashScreenController().display();
            // On charge le jeu
            GameController.getLoadingController().init();
        });
    };
    /**
     * Lorsque le serveur demander d'initialiser le jeu
     * @param socket
     */
    EventsController.prototype.listenInitGame = function (socket) {
        // data = { playerSocketID, clubView, player }
        socket.on('init game', function (data) {
            // On retire le splash screen
            GameController.getSplashScreenController().remove();
            // On affiche la navbar
            GameController.getUIController().getNavbar().display();
            // On écoute l'UI
            GameController.getUIController().listen(socket);
            // On initialise les socket rooms
            GameController.getRoomController().initSocketRoom(socket);
            // On dessine le club view
            GameController.getClubViewController().draw(data);
        });
    };
    /**
     * Lorsqu'on reçoit l'alerte de maintenance
     * @param socket
     */
    EventsController.prototype.listenAlertMaintenance = function (socket) {
        socket.on('alert maintenance', function () {
            GameController.getUIController().getAlertMaintenance().display();
        });
    };
    EventsController.prototype.listenJoinClubView = function (socket) {
        socket.on('join club view', function (data) {
            GameController.getRoomController().removePlayers(data);
            GameController.getRoomController().removeRoom();
            // On dessine le club view
            GameController.getClubViewController().draw(data);
        });
    };
    EventsController.prototype.listenRemoveClubView = function (socket) {
        socket.on('remove club view', function () {
            GameController.getClubViewController().remove();
        });
    };
    /**
     * Gestion des rooms
     * @param socket
     */
    EventsController.prototype.listenUpdateRoom = function (socket) {
        // Afficher la room { room, player }
        socket.on('draw room', function (data) {
            // On retire le clubview
            GameController.getClubViewController().remove();
            // On affiche le background et autres elements qui se repetent pas
            GameController.getRoomController().displayBackground(data);
            /*****************/
            GameController.getRoomController().drawPlayers(data);
        });
    };
    /** Envoyer des evenements **/
    /**
     * Si le jeu est chargé
     */
    EventsController.prototype.gameLoaded = function () {
        Main.socket.emit('incoming player', {
            token: GameController.getPlayerController().getToken()
        });
    };
    /**
     * Demander au serveur de rejoindre une room
     * @param socket
     * @param roomID
     */
    EventsController.prototype.requestJoinRoom = function (socket, roomID) {
        GameController.getRoomController().requestJoinRoom(function () {
            socket.emit('request join room', { roomID: roomID });
        });
    };
    /**
     * Demander au serveur de repartir sur le clubview
     * @param socket
     */
    EventsController.prototype.requestJoinClubView = function (socket) {
        socket.emit('request join club view');
    };
    return EventsController;
}());
