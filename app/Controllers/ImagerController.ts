import {Router, Request, Response, NextFunction} from 'express';

export class ImagerController {

    router: Router

    constructor() {
        this.router = Router()
        this.routes
    }

    public routes() {

        this.router.get('/avatar-imaging/sk-:sk.hd-:hd.hn-:hn.hr-:hr.he-:he.bd-:bd.cl-:cl.act-:act.dr-:dr', (req, res, next) => {

            res.render('imager/index')

        });

    }

}

const Controller = new ImagerController();
Controller.routes();

export default Controller.router;