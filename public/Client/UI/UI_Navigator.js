var UI_Navigator = /** @class */ (function () {
    function UI_Navigator() {
        this.ui = $('.ui');
        this.navigator = $('.navigator');
        this.opened = false;
    }
    UI_Navigator.prototype.listRooms = function () {
        var list = '';
        var rooms = GameController.rooms;
        console.log(rooms);
        for (var key in rooms) {
            var room = GameController.rooms[key];
            if (room.state != 'INVISIBLE') {
                list += '<li class="navigator-room-link" data-room-id="' + room.id + '">' + room.name + ' <span class="navigator-users-in">0</span></li>';
            }
        }
        return list;
    };
    UI_Navigator.prototype.template = function () {
        return '<div class="navigator" style="visibility: hidden">' +
            '   <div class="navigator-header">Navigateur</div>' +
            '   <div id="navigatorClose" class="navigator-close">×</div>' +
            '       <div class="navigator-scroll">' +
            '           <div class="navigator-content">' + this.listRooms() + '</div>' +
            '       </div>' +
            '</div>';
    };
    UI_Navigator.prototype.toggle = function () {
        if (this.opened == false) {
            this.ui.append(this.template());
            this.opened = true;
            $('.navigator').animateCSS('bounceIn', function () {
                $('.navigator').removeClass('bounceIn');
            });
        }
        else {
            this.close();
        }
    };
    UI_Navigator.prototype.close = function () {
        var _this = this;
        $('.navigator').animateCSS('bounceOut', function () {
            $('.navigator').remove();
            _this.opened = false;
        });
    };
    UI_Navigator.prototype.onRoomClick = function (callback) {
        var links = $('[class=navigator-room-link]');
        var _loop_1 = function () {
            var link = links[i];
            $(link).click(function () {
                callback($(link).data('room-id'));
            });
        };
        for (var i = 0; i < links.length; i++) {
            _loop_1();
        }
    };
    UI_Navigator.prototype.onCloseClick = function (callback) {
        $('.navigator-close').click(function () {
            callback();
        });
    };
    return UI_Navigator;
}());
