///<reference path="CST.ts"/>
///<reference path="Assets.ts"/>
///<reference path="Main.ts"/>
var PlayerControllerClass = /** @class */ (function () {
    function PlayerControllerClass() {
    }
    PlayerControllerClass.prototype.initUser = function (token) {
        this.token = token;
    };
    PlayerControllerClass.prototype.draw = function (breathFactor, player, players, camera, room) {
        Main.ctx.save();
        for (var i = 0; i < players.length; i++) {
            if (players[i].socketid == player.socketid) {
                var x = void 0;
                var y = void 0;
                if (GameController.cameras[player.socketid].currentPlayersX == null || GameController.cameras[player.socketid].currentPlayersY == null) {
                    x = room.door.x + camera.offsetX;
                    y = room.door.y + camera.offsetY;
                    Main.socket.emit('players camera update', { startX: room.door.x, startY: room.door.y, x: x, y: y, camera: camera, player: player, room: room, players: players });
                }
                else {
                    x = GameController.cameras[player.socketid].currentPlayersX + player.position.x + camera.offsetX / 8;
                    y = GameController.cameras[player.socketid].currentPlayersY + player.position.y + camera.offsetY / 8;
                    Main.socket.emit('players camera update', { startX: room.door.x, startY: room.door.y, x: x, y: y, camera: camera, player: player, room: room, players: players });
                }
                // On dessine le joueur actuel avec ses positions et les positions de sa camera
                this.drawAvatar(players[i], x, y);
            }
            else {
                var x = void 0;
                var y = void 0;
                if (GameController.cameras[player.socketid].currentPlayersX == null || GameController.cameras[player.socketid].currentPlayersY == null) {
                    x = room.door.x + camera.offsetX;
                    y = room.door.y + camera.offsetY;
                }
                else {
                    x = GameController.cameras[player.socketid].currentPlayersX + players[i].position.x + camera.offsetX / 8;
                    y = GameController.cameras[player.socketid].currentPlayersY + players[i].position.y + camera.offsetY / 8;
                }
                // On dessine les autres joueurs avec leurs positions et la position de la camera du joueur actuel
                this.drawAvatar(players[i], x, y);
            }
        }
    };
    PlayerControllerClass.prototype.drawAvatar = function (player, x, y) {
        var aHead = 'head_' + player.avatar.head + '_' + player.avatar.skin + '_' + player.position.direction + '_' + player.position.flip;
        var aBody = 'body_' + player.avatar.body + '_' + player.avatar.skin + '_' + player.position.direction + '_' + player.position.flip;
        var aLeftSideFoot = 'foot_' + player.avatar.feet + '_' + player.avatar.skin + '_' + player.position.direction + '_left_side';
        var aRightSideFoot = 'foot_' + player.avatar.feet + '_' + player.avatar.skin + '_' + player.position.direction + '_right_side';
        var aSecondSideArm = 'arm_second_side_' + player.avatar.arms + '_' + player.avatar.skin + '_' + player.position.flip;
        var aFirstSideArm = 'arm_first_side_' + player.avatar.arms + '_' + player.avatar.skin + '_' + player.position.flip;
        var aCloth = 'cloth_' + player.avatar.clothes + '_' + player.position.direction + '_' + player.position.flip;
        var aHair = 'hair_' + player.avatar.hair + '_' + player.position.direction + '_' + player.position.flip;
        var aEyes = 'eyes_' + player.avatar.eyes + '_' + player.position.flip;
        Main.ctx.drawImage(Assets.images[aLeftSideFoot], x, y);
        Main.ctx.drawImage(Assets.images[aRightSideFoot], x, y);
        Main.ctx.drawImage(Assets.images[aBody], x, y);
        player.position.direction == 'front' ? Main.ctx.drawImage(Assets.images[aSecondSideArm], x, y) : Main.ctx.drawImage(Assets.images[aFirstSideArm], x, y);
        Main.ctx.drawImage(Assets.images[aCloth], x, y);
        Main.ctx.drawImage(Assets.images[aHead], x, y);
        Main.ctx.drawImage(Assets.images[aHair], x, y);
        player.position.direction == 'front' ? Main.ctx.drawImage(Assets.images[aFirstSideArm], x, y) : Main.ctx.drawImage(Assets.images[aSecondSideArm], x, y);
        player.position.direction == 'front' ? Main.ctx.drawImage(Assets.images[aEyes], x, y) : Main.ctx.drawImage(Assets.images['empty'], x, y);
    };
    PlayerControllerClass.prototype.drawOnce = function (coords, direction, flip, skin, head, body, cloth, hair, eyes, arms, feet) {
        var x = coords[0];
        var y = coords[1];
        Main.ctx.save();
        var aHead = 'head_' + head + '_' + skin + '_' + direction + '_' + flip;
        var aBody = 'body_' + body + '_' + skin + '_' + direction + '_' + flip;
        var aLeftSideFoot = 'foot_' + feet + '_' + skin + '_' + direction + '_left_side';
        var aRightSideFoot = 'foot_' + feet + '_' + skin + '_' + direction + '_right_side';
        var aSecondSideArm = 'arm_second_side_' + arms + '_' + skin + '_' + flip;
        var aFirstSideArm = 'arm_first_side_' + arms + '_' + skin + '_' + flip;
        var aCloth = 'cloth_' + cloth + '_' + direction + '_' + flip;
        var aHair = 'hair_' + hair + '_' + direction + '_' + flip;
        var aEyes = 'eyes_' + eyes + '_' + flip;
        Main.ctx.drawImage(Assets.images[aLeftSideFoot], x, y);
        Main.ctx.drawImage(Assets.images[aRightSideFoot], x, y);
        Main.ctx.drawImage(Assets.images[aBody], x, y);
        direction == 'front' ? Main.ctx.drawImage(Assets.images[aSecondSideArm], x, y) : Main.ctx.drawImage(Assets.images[aFirstSideArm], x, y);
        Main.ctx.drawImage(Assets.images[aCloth], x, y);
        Main.ctx.drawImage(Assets.images[aHead], x, y);
        Main.ctx.drawImage(Assets.images[aHair], x, y);
        direction == 'front' ? Main.ctx.drawImage(Assets.images[aFirstSideArm], x, y) : Main.ctx.drawImage(Assets.images[aSecondSideArm], x, y);
        direction == 'front' ? Main.ctx.drawImage(Assets.images[aEyes], x, y) : Main.ctx.drawImage(Assets.images['empty'], x, y);
    };
    return PlayerControllerClass;
}());
var PlayerController = new PlayerControllerClass;
