export default class PlayerSelf {

    private position: any
    private moveFactor: number
    private index: number
    private direction: string
    private flip: string

    public constructor() {

        this.position = {}
        this.moveFactor = 0

    }

    /** Setters **/

    public setMoveFactor(value: number) {

        this.moveFactor = value

    }

    public setInitialPosition(coords: Array<number>) {

        const x = coords[0]
        const y = coords[1]

        this.position.oldX = x
        this.position.oldY = y
        //this.position.currentX = Math.floor(Math.random() * (x - 0 + 1) + 0);
        //this.position.currentY = Math.floor(Math.random() * (y - 50 + 1) + 50);
        this.position.currentX = x
        this.position.currentY = y
        this.position.targetX = null
        this.position.targetY = null

    }

    public setOldPosition(coords) {

        const x = coords[0]
        const y = coords[1]

        this.position.oldX = x
        this.position.oldY = y

    }

    public setTargetPosition(coords) {

        const x = coords[0]
        const y = coords[1]

        this.position.targetX = x
        this.position.targetY = y

    }

    public setCurrentPosition(coords) {

        const x = coords[0]
        const y = coords[1]

        this.position.currentX = x
        this.position.currentY = y

    }

    public setIndex(value: number) {

        this.index = value

    }

    public setDirection(value: string) {

        this.direction = value

    }

    public setFlip(value: string) {

        this.flip = value

    }



    /** Getters **/

    public getMoveFactor() {

        return this.moveFactor

    }

    public getPositionCurrentX() {
        return this.position.currentX
    }

    public getPositionCurrentY() {
        return this.position.currentY
    }

    public getPositionTargetX() {
        return this.position.targetX
    }

    public getPositionTargetY() {
        return this.position.targetY
    }

    public getPositionOldX() {
        return this.position.oldX
    }

    public getPositionOldY() {
        return this.position.oldY
    }

    public getIndex() {
        return this.index
    }

}