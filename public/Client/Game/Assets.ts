///<reference path="../CST.ts"/>
class AssetsClass {

    loadingState: number
    images: any
    paths: any
    numImagesLoaded: number

    constructor() {

        this.loadingState = 0
        this.numImagesLoaded = 0
        this.images = {}
        // Nombre d'assets
        this.paths = 35

    }

    /*
    On charge une image
     */
    private loadImage(name, dir?, base_dir?) {

        this.images[name] = new Image();
        this.images[name].onload = function() {
            Assets.imageLoaded()
        }
        this.images[name].src = CST.data.IMAGES_PATH + (base_dir ? base_dir + '/' : '') + (dir ? dir + '/' : '') + name + '.png';
    }

    /*
    On charge toutes les images
     */
    public loadImages(callback) {

        function getArray(){
            return $.getJSON('../data/assets_path.json');
        }

        const $this = this
        getArray().done( function(json) {
            var _len = json.length;

            //this.paths = _len

            for (var i in json) {

                $this.loadImage(json[i].name, json[i].dir, json[i].base_dir)

            }

        });


        setInterval(() => {

            if(this.loadingState === 0 && this.numImagesLoaded === this.paths) {

                callback()
                this.loadingState = 1

            }

        }, 1000)

    }

    /*
    Si un image est chargée
     */
    public imageLoaded() {

        this.numImagesLoaded += 1;

    }

}

const Assets = new AssetsClass()