import Player from "../Player/Player";

export default class Entities {

    private entities: any

    public constructor(row?) {

        this.entities = {}

        if(row) {

            //this.addEntity for items

        }


    }

    /** Setters **/

    public addEntity(type: string, id: string | number, entity: any) {

        if(type == 'player') {

            this.entities[id] = entity
            this.entities[id].type = type

        } else if(type == 'item') {

            this.entities[id] = entity
            this.entities[id].type = type

        }

    }

    public removeEntity(type: string, id: string | number) {

        delete this.entities[id]

    }

    public entityInRoom(type : string, id: string | number) {

        this.entities[id] ? true : false

    }




    public ejectPlayers() {

    }

    public ejectPlayer(playerSocketID: string) {

    }

    public summonPlayer(playerSocketID: string) {

    }

    public mutePlayer(playerSocketID: string) {

    }

    public unmutePlayer(playerSocketID: string) {

    }

    public banPlayer(playerSocketID: string) {

    }

    public unbanPlayer(playerSocketID: string) {

    }

    public freezePlayers(playerSocketID: string) {

    }



    /** Getters **/

    public getEntities() {

        return this.entities

    }

    public getEntity(id: string | number) {
        return this.entities[id]
    }
}