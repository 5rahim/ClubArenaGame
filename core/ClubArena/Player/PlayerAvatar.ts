export default class PlayerAvatar {

    private head: number | string
    private hair: number | string
    private eyes: number | string
    private body: number | string
    private clothes: number | string
    private feet: number | string
    private arms: number | string
    private skin: string

    constructor(row) {

        this.head = row.head
        this.hair = row.hair
        this.eyes = row.eyes
        this.body = row.body
        this.clothes = row.clothes
        this.feet = row.feet
        this.arms = row.arms
        this.skin = row.skin

    }

    public getHead() {
        return this.head
    }

    public getHair() {
        return this.hair
    }

    public getEyes() {
        return this.eyes
    }

    public getBody() {
        return this.body
    }

    public getClothes() {
        return this.clothes
    }

    public getFeet() {
        return this.feet
    }

    public getArms() {
        return this.arms
    }

    public getSkin() {
        return this.skin
    }

}