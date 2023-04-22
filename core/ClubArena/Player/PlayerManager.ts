import Player from "./Player";

export default class PlayerManager {

    private players

    public constructor() {

        this.players = {}

    }

    public addPlayer(player: Player): void {

        this.players[player.getInfo().getSocketID()] = player

    }

    public removePlayer(playerSocketID: string): void {

        if(playerSocketID && this.players[playerSocketID]) {

            delete this.players[playerSocketID]

        }

    }

    /** Getters **/

    public getPlayer(playerSocketID: string): Player {

        return this.players[playerSocketID] ? this.players[playerSocketID] : null
    }

    public getPlayers() {

        return this.players

    }

    public getPlayersCount(): number {

        return this.players.length

    }

}