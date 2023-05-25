const userService = require('../service/user.service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api.error');


class UserController {
    async registration(req, res, next) {
        try {
            // validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка валидации', errors.array()));
            }

            // take data from body request
            const { email, password, roles } = req.body;

            // registration new user
            const userData = await userService.registration(email, password, roles);

            // save token on cookie
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(userData);

        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            // take data from body request
            const { email, password, roles } = req.body;

            // login user
            const userData = await userService.login(email, password, roles);

            // save token on cookie
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            // get refresh token
            const { refreshToken } = req.cookies;

            // logout user
            const token = await userService.logout(refreshToken);

            // remove cookie for user
            res.clearCookie('refreshToken');

            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            // take activation from request params 
            const activationLink = req.params.link;

            // activation account for link
            await userService.activate(activationLink);

            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            // get refresh token
            const { refreshToken } = req.cookies;

            // call refresh token function
            const userData = await userService.refresh(refreshToken);

            // save token on cookie
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new UserController();