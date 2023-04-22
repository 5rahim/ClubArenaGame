import ClubView from "./ClubView";

export default class ClubViewManager {

    private clubViews

    public constructor() {

        this.clubViews = {}

    }

    public addView(clubView: ClubView): void {

        this.clubViews[clubView.getPlayer().getInfo().getSocketID()] = clubView

    }

    public removeView(playerSocketID: number): void {

        delete this.clubViews[playerSocketID]

    }

    /** Getters **/

    public getView(playerSocketID: string) {

        return this.clubViews[playerSocketID]
    }

    public getViews() {

        return this.clubViews

    }

    public getViewsCount(): number {

        return this.clubViews.length

    }

}