import Player from "../Player/Player";

export default class ClubView {

    private id: string | number
    private player: Player

    public constructor(player: Player) {

        this.id = player.getInfo().getSocketID()
        this.player = player

    }

    public getID(): string | number {
        return this.id
    }

    public getPlayer(): Player {
        return this.player
    }

}