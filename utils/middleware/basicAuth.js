const auth = require('basic-auth');
const UserSchema = require('../../models/user')

const autentication = async (req, res, next) => {
    try {
        const user = await auth(req);
        console.log(user.name)

        const userFound = await UserSchema.findOne({ username: user.name })
        console.log(userFound)
        if (!userFound) {
            res.status(401).json({
                error: 'invalid user or password'
            })
        }
        if (userFound.verifyPassword(user.pass)) {
            console.log('auth: success');
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