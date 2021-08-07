const auth = require('basic-auth');
const UserSchema = require('../../models/user')
const AuthError = require('../errors/authError');

const authentication = async (req, res, next) => {
    try {
        const user = await auth(req);

        if (!user) {
            throw new AuthError('invalid user or password');
        }

        const userFound = await UserSchema.findOne({ username: user.name })
        if (!userFound) {
            throw new AuthError('invalid user or password');
        }
        if (userFound.verifyPassword(user.pass)) {
            next();
        } else {
            throw new AuthError('invalid user or password')
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authentication;