///<reference path="CST.ts"/>
var AssetsClass = /** @class */ (function () {
    function AssetsClass() {
        this.loadingState = 0;
        this.numImagesLoaded = 0;
        this.images = {};
        // Nombre d'assets
        this.paths = 33;
    }
    /*
    On charge une image
     */
    AssetsClass.prototype.loadImage = function (name, dir, base_dir) {
        this.images[name] = new Image();
        this.images[name].onload = function () {
            Assets.imageLoaded();
        };
        this.images[name].src = CST.data.IMAGES_PATH + (base_dir ? base_dir + '/' : '') + (dir ? dir + '/' : '') + name + '.png';
    };
    /*
    On charge toutes les images
     */
    AssetsClass.prototype.loadImages = function (callback) {
        var _this = this;
        function getArray() {
            return $.getJSON('data/assets_path.json');
        }
        var $this = this;
        getArray().done(function (json) {
            var _len = json.length;
            //this.paths = _len
            for (var i in json) {
                $this.loadImage(json[i].name, json[i].dir, json[i].base_dir);
            }
        });
        setInterval(function () {
            if (_this.loadingState === 0 && _this.numImagesLoaded === _this.paths) {
                callback();
                _this.loadingState = 1;
            }
        }, 1000);
    };
    /*
    Si un image est chargée
     */
    AssetsClass.prototype.imageLoaded = function () {
        this.numImagesLoaded += 1;
    };
    return AssetsClass;
}());
var Assets = new AssetsClass();
