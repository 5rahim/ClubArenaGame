///<reference path="../Game/Assets.ts"/>
///<reference path="../Main.ts"/>
class LoadingController {

    public init() {

        Assets.loadImages(() => {

            this.loaded()

        })

    }

    private loaded() {

        GameController.getEventsController().gameLoaded()

    }

}