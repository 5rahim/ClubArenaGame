import UserModel from "../app/Models/UserModel";
import AvatarModel from "../app/Models/AvatarModel";

export class Player {

    private default_x: number;
    private default_y: number;

    constructor() {

        this.default_x = 0
        this.default_y = 0

    }

    /**
     * On retourne les données de l'utilisateur selon son token
     */
    public setPlayer(id, token) {

        return new Promise( async (resolve, reject) => {

            const user = await UserModel.findBy('token', token) as any
            const avatar = await AvatarModel.findBy('user_token', token) as any

            const data = {
                currentRoom: id,
                socketid: id,
                id: user.id,
                token: user.token,
                username: user.username,
                created_at: user.created_at,
                avatar: {
                    skin: avatar.skin,
                    body: avatar.body,
                    head: avatar.head,
                    clothes: avatar.clothes,
                    hair: avatar.hair,
                    eyes: avatar.eyes,
                    arms: avatar.arms,
                    feet: avatar.feet
                },
                position: {
                    x: this.default_x,
                    y: this.default_y
                }
            }

            resolve(data)

        })

    }
}

export default new Player()