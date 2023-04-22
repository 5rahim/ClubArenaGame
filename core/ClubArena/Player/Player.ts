import PlayerInfo from "./PlayerInfo";
import PlayerAvatar from "./PlayerAvatar";
import PlayerPermission from "./PlayerPermission";
import PlayerSelf from "./PlayerSelf";

export default class Player {

    private info: PlayerInfo
    private avatar: PlayerAvatar
    private permission: PlayerPermission
    private self: PlayerSelf
    private currentRoom: number | string

    public constructor(data, socketID) {

        this.info = new PlayerInfo(data.player, socketID)
        this.avatar = new PlayerAvatar(data.avatar)
        this.permission = new PlayerPermission(data.player)
        this.self = new PlayerSelf()
        this.currentRoom = socketID

    }

    /** Setters **/

    public setCurrentRoom(roomID: string | number) {

        this.currentRoom = roomID

    }




    /** Getters **/

    public getCurrentRoom() {

        return this.currentRoom
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

    public getPermission() {

        return this.permission

    }

}