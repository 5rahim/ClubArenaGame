import { Model } from '../../core/Database/Model';

export class RoomModel extends Model {

    constructor() {
        super('rooms');
    }

}

export default new RoomModel;