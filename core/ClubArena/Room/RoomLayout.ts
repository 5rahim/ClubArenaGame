export default class RoomLayout {

    private width: number
    private height: number

    private door_x: number
    private door_y: number

    public constructor(row) {

        this.width = row.width
        this.height = row.height

        this.door_x = row.door_x
        this.door_y = row.door_y

    }

    public getWidth() {
        return this.width
    }

    public getHeight() {
        return this.height
    }

    public getDoorX() {
        return this.door_x
    }

    public getDoorY() {
        return this.door_y
    }

}