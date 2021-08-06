const auth = require('basic-auth');
const UserSchema = require('../../models/user')

const autentication = async (req, res, next) => {
    try {
        const user = await auth(req);

        const userFound = await UserSchema.findOne({ username: user.name })
        if (!userFound) {
            res.status(401).json({
                error: 'invalid user or password'
            })
        }
        if (userFound.verifyPassword(user.pass)) {
            next();
        } else {
            res.status(401).json({
                error: 'invalid user or password'
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = autentication;