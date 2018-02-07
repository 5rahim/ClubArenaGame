import {Router, Request, Response, NextFunction} from 'express';
import * as bcrypt from 'bcryptjs';
import UserModel from '../app/Models/UserModel';
const crypto = require('crypto')
import {Result} from "express-validator/shared-typings";

export class Door {

    secret: string

    constructor() {
        this.secret = 'uwelovesome'
    }

    private renderWelcome(req, res, registerErrors: any, loginErrors: any): void {

        res.render('game/index', { loginErrors: loginErrors })

    }


    public async login(req, res) {

        req.checkBody('username', 'rUsernameEmpty').notEmpty()
        req.checkBody('password', 'rPasswordEmpty').notEmpty()

        const errors = req.validationErrors();

        // Si il y a une erreur dans le formulaire
        if(errors) {

            // Retourner la page de connexion
            this.renderWelcome(req, res, '', errors)

        } else {

            // Rechercher l'utilisateur demandé
            const user: any = await UserModel.findBy('username', req.body.username)

            if(user) {

                // Si les mots de passe correspondent
                if(bcrypt.compareSync(req.body.password, user.password)) {

                    // On initialise les sessions
                    this.initSessions(req, res, user)

                    res.redirect('/client')

                } else {

                    // Retourner la page de connexion
                    this.renderWelcome(req, res, '',  [{msg: 'rIncorrectPassword'}])

                }

            } else {

                // Retourner la page de connexion
                this.renderWelcome(req, res, '',  [{msg: 'unknowUser'}])

            }

        }

    }


    // Initialiser les sessions et cookies
    private initSessions(req, res, user) {

        req.session.user = user.token;
        //res.cookie('user_stoken', user.token, {maxAge: 2628000000, httpOnly: true});

    }

    public isAuth(req) {

        return req.session.user ? true : false

    }

    public authRequired(req, res) {

        req.session.user ? res.render('game/client') : res.redirect('/')

    }

    public localIsAuth(req) {

        return new Promise((resolve, reject) => {

            return this.isAuth(req) ? resolve(true) : resolve(false)

        })

    }

    // Déconnexion
    public logout(req, res) {

        // On verifie si les sessions et cookies existe
        if(this.isAuth(req)) {
            // On supprime le cookie
            //res.clearCookie('user_stoken')
            // On supprime les sessions
            req.session.destroy((err) => {})
            // On redirige vers la page de bienvenue
            return res.redirect('/')
        } else {
            // On redirige vers la page de bienvenue
            return res.redirect('/')
        }

    }

}

export default new Door;