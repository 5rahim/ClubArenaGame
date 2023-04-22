class Config {

    get data() {
        return this._data;
    }

    private _data;

    public constructor() {

        this._data =
            {
                ENV: 'dev',
                //
                CANVAS: 'game',
                FPS: 50,
                //
                IMAGES_PATH: '/images/'
            }

    }

}

const CST = new Config

