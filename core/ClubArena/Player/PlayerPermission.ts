export default class PlayerPermission {

    private _hasAccessInMaintenance: boolean
    private _hasAccessAnyRoom: boolean
    private _canStayAfterEject: boolean;

    public constructor(player) {

        this._hasAccessInMaintenance = (player.rank >= 5)
        this._hasAccessAnyRoom = (player.rank >= 5)
        this._canStayAfterEject = (player.rank >= 5)

    }

    public hasAccessInMaintenance() {

        return this._hasAccessInMaintenance

    }

    public hasAccessAnyRoom() {

        return this._hasAccessAnyRoom

    }

    public canStayAfterEject() {

        return this._canStayAfterEject

    }

}