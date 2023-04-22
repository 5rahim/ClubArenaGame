import { Model } from '../../core/Database/Model';

export class UserModel extends Model {

    constructor() {
        super('users');
    }

}

export default new UserModel;