///<reference path="CST.ts"/>
///<reference path="Assets.ts"/>
///<reference path="Main.ts"/>
var PlayerControllerClass = /** @class */ (function () {
    function PlayerControllerClass() {
    }
    PlayerControllerClass.prototype.initUser = function (token) {
        this.token = token;
    };
    PlayerControllerClass.prototype.draw = function (coords, data) {
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
