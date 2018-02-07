import User from "./core/User";
import Door from "./core/Door";

export class Locals {

    public init(app) {

        app.use( async (req, res, next) => {

            res.locals.req = req
            res.locals.csrfToken = req.csrfToken()
            res.locals.token = req.session.user ? req.session.user : null
            res.locals.isAuth = await Door.localIsAuth(req)
            next()

        })

    }

}

export default new Locals