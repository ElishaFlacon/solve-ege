const db = require('../db');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail.service');
const tokenService = require('./token.service');
const UserDto = require('../dtos/user.dto');
const ApiError = require('../exceptions/api.error');


class UserService {
    async registration(email, password, roles) {
        // check existence user
        const candidate = await db.query(
            `SELECT * FROM user_account where email = $1`,
            [email]
        );
        if (candidate.rows[0]) {
            throw ApiError.BadRequest(`Такой пользователь уже существует!`);
        }

        // hash password, and create active link 
        const hashPassword = bcrypt.hashSync(password, 3);
        const activationLink = uuid.v4();

        // create user on db
        await db.query(
            `INSERT INTO user_account (email, password, activationLink) values ($1, $2, $3) RETURNING * `,
            [email, hashPassword, activationLink]
        );
        if (roles) {
            await db.query(
                `UPDATE user_account set roles = $2 where email = $1 RETURNING * `,
                [email, roles]
            );
        }

        // get user data
        const user = await db.query(
            `SELECT * FROM user_account where email = $1`,
            [email]
        );

        // send mail for activate account
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        // create tokens
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });

        // create refresh tokens on db
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async activate(activationLink) {
        // check user and take it
        const user = await db.query(
            `SELECT * FROM user_account where activationlink = $1`,
            [activationLink]
        );
        if (!user.rows[0]) {
            throw ApiError.BadRequest('Такой ссылки не существует!');
        }

        // update isactivated to true
        await db.query(
            `UPDATE user_account set isactivated = $2 where id = $1`,
            [user.rows[0].id, true]
        );
    }

    async login(email, password, roles) {
        // get user data and check it
        const user = await db.query(
            `SELECT * FROM user_account where email = $1`,
            [email]
        );
        if (!user.rows[0]) {
            throw ApiError.BadRequest('Пользователь не найден, при логине!');
        }

        // check correct password
        const isPassEquals = await bcrypt.compare(password, user.rows[0].password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Пароль неверный!');
        }

        // create tokens
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });

        // create refresh tokens on db
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async logout(refreshToken) {
        // remove refresh token
        const token = await tokenService.removeToken(refreshToken);

        return token;
    }

    async refresh(refreshToken) {
        // check refrsh token
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        // validation refresh token
        const userData = tokenService.validateRefreshToken(refreshToken);

        // find refresh token from data base
        const tokenFromDb = await tokenService.findToken(refreshToken);

        // check it
        if (!tokenFromDb.rows[0] || !userData) {
            throw ApiError.UnauthorizedError();
        }

        // get user
        const user = await db.query(
            `SELECT * FROM user_account where id = $1`,
            [userData.id]
        );

        // create tokens
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });

        // create refresh tokens on db
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async getAllUsers() {
        const users = await db.query(`SELECT * FROM user_account`);
        return users.rows;
    }
}


module.exports = new UserService();