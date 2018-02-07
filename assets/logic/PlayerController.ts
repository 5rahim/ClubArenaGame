///<reference path="CST.ts"/>
///<reference path="Assets.ts"/>
///<reference path="Main.ts"/>
class PlayerControllerClass {

    public token: string

    public initUser(token) {

        this.token = token

    }

    public draw(coords, data) {



    }

    public drawOnce(coords, direction, flip, skin, head, body, cloth, hair, eyes, arms, feet) {

        const x = coords[0]
        const y = coords[1]

        Main.ctx.save()

        const aHead = 'head_' + head + '_' + skin + '_' + direction + '_' + flip
        const aBody = 'body_' + body + '_' + skin + '_' + direction + '_' + flip
        const aLeftSideFoot = 'foot_' + feet + '_' + skin + '_' + direction + '_left_side'
        const aRightSideFoot = 'foot_' + feet + '_' + skin + '_' + direction + '_right_side'
        const aSecondSideArm = 'arm_second_side_' + arms + '_' + skin + '_' + flip
        const aFirstSideArm = 'arm_first_side_' + arms + '_' + skin + '_' + flip
        const aCloth = 'cloth_' + cloth + '_' + direction + '_' + flip
        const aHair = 'hair_' + hair + '_' + direction + '_' + flip
        const aEyes = 'eyes_' + eyes + '_' + flip

        Main.ctx.drawImage(Assets.images[aLeftSideFoot], x, y)
        Main.ctx.drawImage(Assets.images[aRightSideFoot], x, y)
        Main.ctx.drawImage(Assets.images[aBody], x, y)
        direction == 'front' ? Main.ctx.drawImage(Assets.images[aSecondSideArm], x, y) : Main.ctx.drawImage(Assets.images[aFirstSideArm], x, y)
        Main.ctx.drawImage(Assets.images[aCloth], x, y)
        Main.ctx.drawImage(Assets.images[aHead], x, y)
        Main.ctx.drawImage(Assets.images[aHair], x, y)
        direction == 'front' ? Main.ctx.drawImage(Assets.images[aFirstSideArm], x, y) : Main.ctx.drawImage(Assets.images[aSecondSideArm], x, y)
        direction == 'front' ? Main.ctx.drawImage(Assets.images[aEyes], x, y) : Main.ctx.drawImage(Assets.images['empty'], x, y)


    }

}

const PlayerController = new PlayerControllerClass;