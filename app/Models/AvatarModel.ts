import { Model } from '../../core/Database/Model';

export class AvatarModel extends Model {

    constructor() {
        super('user_avatar');
    }

}

export default new AvatarModel;