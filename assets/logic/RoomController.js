///<reference path="PlayerController.ts"/>
var RoomControllerClass = /** @class */ (function () {
    function RoomControllerClass() {
        this.roomAnimation = {};
        this.animations = {};
    }
    /**
     * On initilialise le room controller qui va draw les rooms chaque frame
     */
    RoomControllerClass.prototype.init = function (data) {
        this.animate(data);
    };
    RoomControllerClass.prototype.unset = function (data) {
        this.unanimate(data);
    };
    /**
     * On déssine la room
     * avec les données des joueurs présents dans la room, des cameras
     * @param data
     */
    RoomControllerClass.prototype.draw = function (data) {
        var room = GameController.rooms[data.id];
        Main.ctx.clearRect(0, 0, Main.canvas.width, Main.canvas.height);
        Main.ctx.save();
        /**
         * Draw room
         */
        this.drawRoom(room, data);
        /**
         * Draw players
         */
        for (var i = 0; i < room.playersIn.length; i++) {
            var player = room.playersIn[i];
            //test
            /**if(i == 0) {
                PlayerController.drawOnce([30,Main.canvas.height - 140], 'front', 'left', player.avatar.skin, player.avatar.head, player.avatar.body, player.avatar.clothes, player.avatar.hair,  player.avatar.eyes, player.avatar.arms, player.avatar.feet)
            } else {
                PlayerController.drawOnce([120,Main.canvas.height - 140], 'front', 'left', player.avatar.skin, player.avatar.head, player.avatar.body, player.avatar.clothes, player.avatar.hair,  player.avatar.eyes, player.avatar.arms, player.avatar.feet)
            }**/
        }
    };
    /**
     * On draw la room
     */
    RoomControllerClass.prototype.drawRoom = function (room, data) {
        // On récupère la camera du joueur
        var camera = GameController.cameras[data.socketid];
        // On fait une boucle pour obtenir tous les joueurs
        for (var i = 0; i < room.playersIn.length; i++) {
            var player = room.playersIn[i];
            // Pour le joueur actuel
            if (player.socketid == data.socketid) {
                var roomStartX = (Main.canvas.width / 2) - (room.background.width / 2);
                var roomStartY = (Main.canvas.height / 2) - (room.background.height / 2);
                var roomX = void 0;
                var roomY = void 0;
                /**
                 * On gère les positionnements
                 */
                // Si la camera du joueur n'a pas enregistré de mouvement de la room
                if (camera.currentRoomX == null || camera.currentRoomY == null) {
                    roomX = roomStartX + camera.offsetX;
                    roomY = roomStartY + camera.offsetY;
                    // On envoie les variables
                    Main.socket.emit('room camera update', { startX: roomStartX, startY: roomStartY, x: roomX, y: roomY, camera: camera, player: player, room: room });
                }
                else {
                    roomX = camera.currentRoomX + camera.offsetX / 8;
                    roomY = camera.currentRoomY + camera.offsetY / 8;
                    Main.socket.emit('room camera update', { startX: roomStartX, startY: roomStartY, x: roomX, y: roomY, camera: camera, player: player, room: room });
                }
                /**
                 * On déssinne les éléments en fonction de leur position
                 */
                // Room background
                Main.ctx.drawImage(Assets.images[room.image], roomX, roomY);
                PlayerController.draw(0, player, room.playersIn, camera, room);
            }
        }
    };
    /**
     * On veut rejoindre une room
     * @param id
     */
    RoomControllerClass.prototype.joinRoom = function (id) {
        Main.socket.emit('join room', { id: id });
    };
    /**
     * On veut quitter une room
     * @param id
     */
    RoomControllerClass.prototype.joinLandingRoom = function () {
        Main.socket.emit('join landing room');
    };
    /**
     * La fonction d'animation
     */
    RoomControllerClass.prototype.animate = function (data) {
        RoomController.draw(data);
        this.animations[data.socketid] = window.requestAnimationFrame(function () {
            RoomController.animate(data);
        });
    };
    RoomControllerClass.prototype.unanimate = function (data) {
        window.cancelAnimationFrame(this.animations[data.socketid]);
        delete this.animations[data.socketid];
    };
    return RoomControllerClass;
}());
var RoomController = new RoomControllerClass();
