const ApiError = require("../exceptions/api.error");
const tokenService = require('../service/token.service');


module.exports = function (req, res, next) {
    try {
        // get header data and check it
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(ApiError.UnauthorizedError());
        }

        // get access token and check it 
        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        // validate token
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        // post in user userData
        req.user = userData;

        // give control for next middleware
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};