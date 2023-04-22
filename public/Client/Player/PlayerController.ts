class PlayerController {

    private socketID: number
    private token: string

    public players

    public constructor(socketID, token) {

        this.socketID = socketID
        this.token = token

        this.players = {}

    }

    public drawAvatar(ctx, avatar, direction, flip, x, y, breathFactor) {

        const aHead = 'head_' + avatar.head + '_' + avatar.skin + '_' + direction + '_' + flip
        const aBody = 'body_' + avatar.body + '_' + avatar.skin + '_' + direction + '_' + flip
        const aLeftSideFoot = 'foot_' + avatar.feet + '_' + avatar.skin + '_' + direction + '_left_side'
        const aRightSideFoot = 'foot_' + avatar.feet + '_' + avatar.skin + '_' + direction + '_right_side'
        const aSecondSideArm = 'arm_second_side_' + avatar.arms + '_' + avatar.skin + '_' + flip
        const aFirstSideArm = 'arm_first_side_' + avatar.arms + '_' + avatar.skin + '_' + flip
        const aCloth = 'cloth_' + avatar.clothes + '_' + direction + '_' + flip
        const aHair = 'hair_' + avatar.hair + '_' + direction + '_' + flip
        const aEyes = 'eyes_' + avatar.eyes + '_' + flip
        const aShadow = '1_shadow'

        ctx.translate(15, 37.5)
        ctx.drawImage(Assets.images[aShadow], x, y)
        ctx.drawImage(Assets.images[aLeftSideFoot], x, y)
        ctx.drawImage(Assets.images[aRightSideFoot], x, y)
        ctx.drawImage(Assets.images[aBody], x, y)
        direction == 'front' ? ctx.drawImage(Assets.images[aSecondSideArm], x, y) : ctx.drawImage(Assets.images[aFirstSideArm], x, y)
        ctx.drawImage(Assets.images[aCloth], x, y)
        ctx.drawImage(Assets.images[aHead], x , y + breathFactor)
        ctx.drawImage(Assets.images[aHair], x, y + breathFactor)
        direction == 'front' ? ctx.drawImage(Assets.images[aFirstSideArm], x, y) : ctx.drawImage(Assets.images[aSecondSideArm], x, y)
        direction == 'front' ? ctx.drawImage(Assets.images[aEyes], x, y  + breathFactor) : ctx.drawImage(Assets.images['empty'], x, y)
        ctx.translate(-15, -37.5)

    }

    public drawOnce(ctx, coords, direction, flip, skin, head, body, cloth, hair, eyes, arms, feet) {

        const x = coords[0]
        const y = coords[1]

        ctx.save()

        const aHead = 'head_' + head + '_' + skin + '_' + direction + '_' + flip
        const aBody = 'body_' + body + '_' + skin + '_' + direction + '_' + flip
        const aLeftSideFoot = 'foot_' + feet + '_' + skin + '_' + direction + '_left_side'
        const aRightSideFoot = 'foot_' + feet + '_' + skin + '_' + direction + '_right_side'
        const aSecondSideArm = 'arm_second_side_' + arms + '_' + skin + '_' + flip
        const aFirstSideArm = 'arm_first_side_' + arms + '_' + skin + '_' + flip
        const aCloth = 'cloth_' + cloth + '_' + direction + '_' + flip
        const aHair = 'hair_' + hair + '_' + direction + '_' + flip
        const aEyes = 'eyes_' + eyes + '_' + flip
        const aShadow = '1_shadow'

        ctx.drawImage(Assets.images[aShadow], x, y)
        ctx.drawImage(Assets.images[aLeftSideFoot], x, y)
        ctx.drawImage(Assets.images[aRightSideFoot], x, y)
        ctx.drawImage(Assets.images[aBody], x, y)
        direction == 'front' ? ctx.drawImage(Assets.images[aSecondSideArm], x, y) : ctx.drawImage(Assets.images[aFirstSideArm], x, y)
        ctx.drawImage(Assets.images[aCloth], x, y)
        ctx.drawImage(Assets.images[aHead], x, y)
        ctx.drawImage(Assets.images[aHair], x, y)
        direction == 'front' ? ctx.drawImage(Assets.images[aFirstSideArm], x, y) : ctx.drawImage(Assets.images[aSecondSideArm], x, y)
        direction == 'front' ? ctx.drawImage(Assets.images[aEyes], x, y) : ctx.drawImage(Assets.images['empty'], x, y)


    }



    /** Setters **/



    /** Getters **/
    public getSocketID() {
        return this.socketID
    }

    public getToken() {
        return this.token
    }

}