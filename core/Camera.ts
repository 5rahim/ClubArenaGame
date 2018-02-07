export class Camera {

    defaultX: number;
    defaultY: number;

    constructor() {

        this.defaultX = 0
        this.defaultY = 0

    }

    public setCamera(id) {

        return new Promise(async (resolve, reject) => {

            const data = {
                player: id,
                x: this.defaultX,
                y: this.defaultY,
            }
            resolve(data)

        })


    }

}

export default new Camera()