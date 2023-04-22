import RoomState from './RoomState'
import RoomModel from "../../../app/Models/RoomModel";
import Player from "../Player/Player";
import RoomLayout from "./RoomLayout";

export default class Room {

    private id: number
    private name: string | number
    private description: string
    private password: string | number
    private userMax: number
    private image: string
    private background_color: string;
    private state: RoomState
    private layout: RoomLayout

    private staffOnly: boolean
    private freezed: boolean
    private muted: boolean

    private chatSpeed: number

    public constructor(row) {

        this.id = row.id
        this.name = row.name
        this.description = row.description
        this.password = row.password
        this.userMax = row.user_max
        this.image = row.image
        this.background_color = row.background_color
        this.state = row.state.toUpperCase()
        this.layout = new RoomLayout(row)
        this.staffOnly = row.staffOnly == 1

        this.freezed = false
        this.muted = false
        this.chatSpeed = row.chat_speed


    }

    /** Setters **/

    public setMute(value: boolean) {

        this.muted = value

    }

    public setFreeze(value: boolean) {

        this.freezed = value

    }

    public setChatSpeed(value: number) {

        this.chatSpeed = value

    }

    public setUserMax(roomID: number | string, value: number) {

        if(roomID && value > 0) {

            RoomModel.updateBy('id', roomID, 'user_max', value)
            this.userMax = value

        }

    }

    public setClose(roomID: number) {

        if(roomID) {

            RoomModel.updateBy('id', roomID, 'state', RoomState.LOCKED)
            this.state = RoomState.LOCKED

        }

    }

    public setOpen(roomID: number) {

        if(roomID) {

            RoomModel.updateBy('id', roomID, 'state', RoomState.OPEN)
            this.state = RoomState.OPEN

        }

    }

    public setInvisible(roomID: number) {

        if(roomID) {

            RoomModel.updateBy('id', roomID, 'state', RoomState.INVISIBLE)
            this.state = RoomState.INVISIBLE

        }

    }



    /** Getters **/

    public getID() {
        return this.id
    }

    public getName() {
        return this.name
    }

    public getDescription() {
        return this.description
    }

    public getPassword() {
        return this.password
    }

    public getUserMax() {
        return this.userMax
    }

    public getState() {
        return this.state
    }

    public getLayout() {
        return this.layout
    }

    public getStaffOnly() {
        return this.staffOnly
    }

    public getFreezed() {
        return this.freezed
    }

    public getMuted() {
        return this.muted
    }

    public getChatSpeed() {
        return this.chatSpeed
    }



}