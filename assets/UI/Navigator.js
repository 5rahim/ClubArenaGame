///<reference path="../logic/GameController.ts"/>
///<reference path="../logic/RoomController.ts"/>
var NavigatorUIClass = /** @class */ (function () {
    function NavigatorUIClass() {
        this.opened = false;
    }
    NavigatorUIClass.prototype.listRooms = function () {
        var list = '';
        var rooms = GameController.rooms;
        console.log(rooms);
        for (var key in rooms) {
            if (rooms[key].isPublic) {
                list += '<li class="navigatorJoinRoomLink" data-room-id="' + rooms[key].id + '">' + rooms[key].name + ' <span class="navigator-users-in">' + rooms[key].playersIn.length + '</span></li>';
            }
        }
        return list;
    };
    NavigatorUIClass.prototype.template = function () {
        return '<div class="navigator">' +
            '   <div class="navigator-header">Navigateur</div>' +
            '   <div class="navigator-close">×</div>' +
            '       <div class="navigator-scroll">' +
            '           <div class="navigator-content">' + this.listRooms() + '</div>' +
            '       </div>' +
            '</div>';
    };
    /**
     * On affiche le navigateur
     */
    NavigatorUIClass.prototype.init = function () {
        $('.ui').append(this.template());
        this.opened = true;
        this.listen();
    };
    /**
     * Fermer le navigateur
     */
    NavigatorUIClass.prototype.close = function () {
        this.opened = false;
        $('.navigator').fadeOut(200);
    };
    NavigatorUIClass.prototype.listen = function () {
        var _this = this;
        $('.navigator-close').click(function () {
            _this.close();
        });
        /**
         * Pour chaque room du navigateur
         * On execute la fonction de changement de room
         */
        var navigatorJoinRoomLink = $('[class=navigatorJoinRoomLink]');
        var _loop_1 = function () {
            var link = navigatorJoinRoomLink[i];
            $(link).click(function () {
                RoomController.joinRoom($(link).data('room-id'));
            });
        };
        for (var i = 0; i < navigatorJoinRoomLink.length; i++) {
            _loop_1();
        }
    };
    return NavigatorUIClass;
}());
var NavigatorUI = new NavigatorUIClass();
