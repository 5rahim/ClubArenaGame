import { Model } from '../../core/Database/Model';

export class SettingsModel extends Model {

    constructor() {
        super('settings');
    }

}

export default new SettingsModel;