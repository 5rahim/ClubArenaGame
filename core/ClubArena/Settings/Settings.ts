import SettingsModel from "../../../app/Models/SettingsModel";

export default class Settings {

    private maintenance

    public async init() {

        const settings: any = await SettingsModel.findBy('id', 1)

        this.maintenance = settings.maintenance_mode == 'true' ? true : false

    }

    public getMaintenance() {

        return this.maintenance

    }

}