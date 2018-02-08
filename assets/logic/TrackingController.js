///<reference path="Main.ts"/>
var TrackingControllerClass = /** @class */ (function () {
    function TrackingControllerClass() {
        this.displayed = {};
    }
    TrackingControllerClass.prototype.init = function (data) {
        $('.tracking').append('<div class="camera-tracking" style="width:' + Main.canvas.width + 'px; height:' + Main.canvas.height + 'px"></div>');
        this.listen(data);
    };
    TrackingControllerClass.prototype.unset = function () {
        $('.tracking').html('');
    };
    TrackingControllerClass.prototype.listen = function (data) {
        $('.camera-tracking').on('mouseup', function (event) {
            Main.socket.emit('stop camera update', { socketid: data.socketid });
            console.log('mouse up from tacking');
        });
        /**
         * On envoie les modifications d'offsets de la camera
         * Lorsque l'utilisateur veut deplacer la camera
         */
        $('.camera-tracking').on('mousedown', function (event) {
            var shiftX = event.clientX;
            var shiftY = event.clientY;
            moveAt(event.pageX, event.pageY);
            function moveAt(pageX, pageY) {
                var left = pageX - shiftX;
                var top = pageY - shiftY;
                Main.socket.emit('camera update', { socketid: data.socketid, offsetX: left, offsetY: top });
            }
            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }
            // (3) move the ball on mousemove
            document.addEventListener('mousemove', onMouseMove);
            // (4) drop the ball, remove unneeded handlers
            $('.camera-tracking').on('mouseup', function () {
                document.removeEventListener('mousemove', onMouseMove);
                $('.camera-tracking').on('mouseup', null);
            });
        });
    };
    return TrackingControllerClass;
}());
var TrackingController = new TrackingControllerClass();
