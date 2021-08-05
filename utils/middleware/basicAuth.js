const auth = require('basic-auth');
const UserSchema = require('../../models/user')

const autentication = async (req, res, next) => {
    const user = await auth(req);

    const userFound = await UserSchema.findOne({ username: user.name })
    if (!userFound) {
        //throw new Error('User or password invalid');
        res.send(401)
    }

    if (userFound.verifyPassword(user.pass)) {
        console.log('auth: success');
        next();
    } else {
        console.log('auth: denegated');
        res.send(401);
    }
}

module.exports = autentication;