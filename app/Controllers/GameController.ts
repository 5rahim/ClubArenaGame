import {Router, Request, Response, NextFunction} from 'express';
import Door from "../../core/Site/Door";

export class GameController {

    router: Router

    constructor() {
        this.router = Router()
        this.routes
    }

    public routes() {

        this.router.get('/', (req, res, next) => {

            res.render('game/index', { loginErrors: ''})

        });

        this.router.get('/client', (req, res, next) => {

            Door.authRequired(req, res)

        });

        this.router.get('/logout', (req, res, next) => {

            Door.logout(req, res)

        });

        this.router.post('/login', (req, res, next) => {

            Door.login(req, res)

        });

    }

}

const Controller = new GameController();
Controller.routes();

export default Controller.router;