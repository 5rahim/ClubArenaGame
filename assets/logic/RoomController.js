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
        this.drawRoom(room);
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
    RoomControllerClass.prototype.drawRoom = function (room) {
        var x = 0;
        var y = 0;
        Main.ctx.drawImage(Assets.images[room.image], x, y);
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
