export default class PlayerInfo {

    private id: number
    private username: string
    private token: string
    private email: string
    private created_at: string
    private online: boolean
    private socketID: string
    private rank: number

    public constructor(row, socketID) {

        this.id = row.id
        this.username = row.username
        this.token = row.token
        this.email = row.email
        this.created_at = row.created_at
        this.socketID = socketID
        //this.online = row.online
        this.rank = row.rank

    }

    public getSocketID() {
        return this.socketID
    }

    public getID() {
        return this.id
    }

    public getUsername() {
        return this.username
    }

    public getToken() {
        return this.token
    }

    public getEmail() {
        return this.email
    }

    public getCreatedAt() {
        return this.created_at
    }

    public getRank() {
        return this.rank
    }

    public getOnline() {
        return this.online
    }

}