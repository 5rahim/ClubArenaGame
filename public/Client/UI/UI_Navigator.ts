class UI_Navigator {

    private ui: JQuery<HTMLElement>
    private navigator: JQuery<HTMLElement>
    private opened: boolean

    constructor() {

        this.ui = $('.ui')
        this.navigator = $('.navigator')
        this.opened = false

    }

    private listRooms() {

        let list = ''

        const rooms = GameController.rooms
        console.log(rooms)

        for(let key in rooms) {

            const room = GameController.rooms[key]

            if(room.state != 'INVISIBLE') {

                list += '<li class="navigator-room-link" data-room-id="'+ room.id +'">'+ room.name +' <span class="navigator-users-in">0</span></li>'

            }

        }

        return list

    }

    private template() {

        return '<div class="navigator" style="visibility: hidden">' +
            '   <div class="navigator-header">Navigateur</div>' +
            '   <div id="navigatorClose" class="navigator-close">×</div>' +
            '       <div class="navigator-scroll">' +
            '           <div class="navigator-content">' + this.listRooms() +'</div>' +
            '       </div>' +
            '</div>'

    }

    public toggle() {

        if(this.opened == false) {

            this.ui.append(this.template())
            this.opened = true

            $('.navigator').animateCSS('bounceIn', () => {

                $('.navigator').removeClass('bounceIn')


            })


        } else {

            this.close()

        }


    }

    public close() {

        $('.navigator').animateCSS('bounceOut', () => {

            $('.navigator').remove()
            this.opened = false

        })

    }


    public onRoomClick(callback) {

        const links = $('[class=navigator-room-link]')
        for(var i = 0; i < links.length; i++) {

            const link = links[i]

            $(link).click(() => {

                callback($(link).data('room-id'))

            })

        }

    }



    public onCloseClick(callback) {

        $('.navigator-close').click( () => {

            callback()

        })

    }


}