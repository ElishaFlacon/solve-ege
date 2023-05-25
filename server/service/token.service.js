const jwt = require('jsonwebtoken');
const db = require('../db');


class TokenService {
    generateToken(paylod) {
        // create access and refresch tokens
        const accessToken = jwt.sign(paylod, process.env.JWT_ACCESS, { expiresIn: '10m' });
        const refreshToken = jwt.sign(paylod, process.env.JWT_REFRESH, { expiresIn: '10d' });

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        // take token data and check it
        const tokenData = await db.query(
            `SELECT * FROM user_token where usver = $1`,
            [userId]
        );
        if (tokenData.rows[0]) {
            return await db.query(
                `UPDATE user_token set refreshToken = $1 RETURNING * `,
                [refreshToken]
            );
        }

        // create new token
        const token = await db.query(
            `INSERT INTO user_token (usver, refreshToken) values ($1, $2) RETURNING * `,
            [userId, refreshToken]
        );

        return token;
    }

    async removeToken(refreshToken) {
        // remove refresh token with db
        const tokenData = await db.query(
            `DELETE FROM user_token WHERE refreshtoken = $1`,
            [refreshToken]
        );

        return tokenData;
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        // find token from database
        const tokenData = await db.query(
            `SELECT * FROM user_token where refreshtoken = $1`,
            [refreshToken]
        );

        return tokenData;
    }
}


module.exports = new TokenService();