///<reference path="Main.ts"/>
class TrackingControllerClass {

    displayed: any

    constructor() {

        this.displayed = {}

    }

    public init(data) {

        $('.tracking').append('<div class="camera-tracking" style="width:'+ Main.canvas.width +'px; height:'+ Main.canvas.height +'px"></div>')

        this.listen(data)

    }

    public unset() {

        $('.tracking').html('')

    }

    public listen(data) {

        $('.camera-tracking').on('mouseup', (event) => {

            Main.socket.emit('stop camera update', { socketid: data.socketid})
            console.log('mouse up from tacking')

        })

        /**
         * On envoie les modifications d'offsets de la camera
         * Lorsque l'utilisateur veut deplacer la camera
         */
        $('.camera-tracking').on('mousedown', (event) => {

            let shiftX = event.clientX;
            let shiftY = event.clientY;

            moveAt(event.pageX, event.pageY);

            function moveAt(pageX, pageY) {
                let left = pageX - shiftX;
                let top = pageY - shiftY;

                Main.socket.emit('camera update', { socketid: data.socketid, offsetX: left , offsetY: top})

            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            // (3) move the ball on mousemove
            document.addEventListener('mousemove', onMouseMove);

            // (4) drop the ball, remove unneeded handlers
            $('.camera-tracking').on('mouseup', () => {
                document.removeEventListener('mousemove', onMouseMove);
                $('.camera-tracking').on('mouseup', null);
            });

        });

    }

}

const TrackingController = new TrackingControllerClass()