var PlayerController = /** @class */ (function () {
    function PlayerController(socketID, token) {
        this.socketID = socketID;
        this.token = token;
        this.players = {};
    }
    PlayerController.prototype.drawAvatar = function (ctx, avatar, direction, flip, x, y, breathFactor) {
        var aHead = 'head_' + avatar.head + '_' + avatar.skin + '_' + direction + '_' + flip;
        var aBody = 'body_' + avatar.body + '_' + avatar.skin + '_' + direction + '_' + flip;
        var aLeftSideFoot = 'foot_' + avatar.feet + '_' + avatar.skin + '_' + direction + '_left_side';
        var aRightSideFoot = 'foot_' + avatar.feet + '_' + avatar.skin + '_' + direction + '_right_side';
        var aSecondSideArm = 'arm_second_side_' + avatar.arms + '_' + avatar.skin + '_' + flip;
        var aFirstSideArm = 'arm_first_side_' + avatar.arms + '_' + avatar.skin + '_' + flip;
        var aCloth = 'cloth_' + avatar.clothes + '_' + direction + '_' + flip;
        var aHair = 'hair_' + avatar.hair + '_' + direction + '_' + flip;
        var aEyes = 'eyes_' + avatar.eyes + '_' + flip;
        var aShadow = '1_shadow';
        ctx.translate(15, 37.5);
        ctx.drawImage(Assets.images[aShadow], x, y);
        ctx.drawImage(Assets.images[aLeftSideFoot], x, y);
        ctx.drawImage(Assets.images[aRightSideFoot], x, y);
        ctx.drawImage(Assets.images[aBody], x, y);
        direction == 'front' ? ctx.drawImage(Assets.images[aSecondSideArm], x, y) : ctx.drawImage(Assets.images[aFirstSideArm], x, y);
        ctx.drawImage(Assets.images[aCloth], x, y);
        ctx.drawImage(Assets.images[aHead], x, y + breathFactor);
        ctx.drawImage(Assets.images[aHair], x, y + breathFactor);
        direction == 'front' ? ctx.drawImage(Assets.images[aFirstSideArm], x, y) : ctx.drawImage(Assets.images[aSecondSideArm], x, y);
        direction == 'front' ? ctx.drawImage(Assets.images[aEyes], x, y + breathFactor) : ctx.drawImage(Assets.images['empty'], x, y);
        ctx.translate(-15, -37.5);
    };
    PlayerController.prototype.drawOnce = function (ctx, coords, direction, flip, skin, head, body, cloth, hair, eyes, arms, feet) {
        var x = coords[0];
        var y = coords[1];
        ctx.save();
        var aHead = 'head_' + head + '_' + skin + '_' + direction + '_' + flip;
        var aBody = 'body_' + body + '_' + skin + '_' + direction + '_' + flip;
        var aLeftSideFoot = 'foot_' + feet + '_' + skin + '_' + direction + '_left_side';
        var aRightSideFoot = 'foot_' + feet + '_' + skin + '_' + direction + '_right_side';
        var aSecondSideArm = 'arm_second_side_' + arms + '_' + skin + '_' + flip;
        var aFirstSideArm = 'arm_first_side_' + arms + '_' + skin + '_' + flip;
        var aCloth = 'cloth_' + cloth + '_' + direction + '_' + flip;
        var aHair = 'hair_' + hair + '_' + direction + '_' + flip;
        var aEyes = 'eyes_' + eyes + '_' + flip;
        var aShadow = '1_shadow';
        ctx.drawImage(Assets.images[aShadow], x, y);
        ctx.drawImage(Assets.images[aLeftSideFoot], x, y);
        ctx.drawImage(Assets.images[aRightSideFoot], x, y);
        ctx.drawImage(Assets.images[aBody], x, y);
        direction == 'front' ? ctx.drawImage(Assets.images[aSecondSideArm], x, y) : ctx.drawImage(Assets.images[aFirstSideArm], x, y);
        ctx.drawImage(Assets.images[aCloth], x, y);
        ctx.drawImage(Assets.images[aHead], x, y);
        ctx.drawImage(Assets.images[aHair], x, y);
        direction == 'front' ? ctx.drawImage(Assets.images[aFirstSideArm], x, y) : ctx.drawImage(Assets.images[aSecondSideArm], x, y);
        direction == 'front' ? ctx.drawImage(Assets.images[aEyes], x, y) : ctx.drawImage(Assets.images['empty'], x, y);
    };
    /** Setters **/
    /** Getters **/
    PlayerController.prototype.getSocketID = function () {
        return this.socketID;
    };
    PlayerController.prototype.getToken = function () {
        return this.token;
    };
    return PlayerController;
}());
