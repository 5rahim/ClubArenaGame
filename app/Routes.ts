import { Router } from 'express';
import Locals from "../Locals";
import ImagerController from "./Controllers/ImagerController";
import GameController from "./Controllers/GameController";

export class Routes {

    public initialize(app) {

        let router: Router;
        router = Router();

        // Locals
        Locals.init(app)

        // Routes
        app.use('/', ImagerController);
        app.use('/', GameController);

    }

}

export default new Routes;