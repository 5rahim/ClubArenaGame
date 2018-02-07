var Config = /** @class */ (function () {
    function Config() {
        this._data =
            {
                ENV: 'dev',
                //
                CANVAS: 'game',
                FPS: 50,
                //
                IMAGES_PATH: '/images/'
            };
    }
    Object.defineProperty(Config.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    return Config;
}());
var CST = new Config;
