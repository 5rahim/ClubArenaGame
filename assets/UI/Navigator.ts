///<reference path="../logic/GameController.ts"/>
///<reference path="../logic/RoomController.ts"/>
class NavigatorUIClass {

    opened: boolean

    constructor() {

        this.opened = false

    }

    private listRooms() {

        let list = ''

        const rooms = GameController.rooms
        console.log(rooms)

        for(let key in rooms) {

            if(rooms[key].isPublic) {

                list += '<li class="navigatorJoinRoomLink" data-room-id="'+ rooms[key].id +'">'+ rooms[key].name +' <span class="navigator-users-in">'+ rooms[key].playersIn.length +'</span></li>'

            }

        }

        return list

    }

    private template() {

        return '<div class="navigator">' +
            '   <div class="navigator-header">Navigateur</div>' +
            '   <div class="navigator-close">×</div>' +
            '       <div class="navigator-scroll">' +
            '           <div class="navigator-content">' + this.listRooms() +'</div>' +
            '       </div>' +
            '</div>'

    }

    /**
     * On affiche le navigateur
     */
    public init() {

        $('.ui').append(this.template())

        this.opened = true

        this.listen()

    }

    /**
     * Fermer le navigateur
     */
    public close() {

        this.opened = false

        $('.navigator').fadeOut(200)

    }

    public listen() {

        $('.navigator-close').click(() => {

            this.close()

        })

        /**
         * Pour chaque room du navigateur
         * On execute la fonction de changement de room
         */
        const navigatorJoinRoomLink = $('[class=navigatorJoinRoomLink]')

        for(var i = 0; i < navigatorJoinRoomLink.length; i++) {

            const link = navigatorJoinRoomLink[i]

            $(link).click(() => {

                RoomController.joinRoom($(link).data('room-id'))

            })

        }

    }

}

const NavigatorUI = new NavigatorUIClass()