import PlayerAvatar from "./PlayerAvatar";
import PlayerSelf from "./PlayerSelf";

export default class PlayerRoom {

    private info
    private avatar: PlayerAvatar
    private self: PlayerSelf

    constructor(info: {}, avatar: PlayerAvatar, self: PlayerSelf) {

        this.info = info
        this.avatar = avatar
        this.self = self

    }

    public getInfo() {
        return this.info
    }

    public getAvatar() {
        return this.avatar
    }

    public getSelf() {
        return this.self
    }

}