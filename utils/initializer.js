const User = require('../models/user')
const logger = require('../utils/logger')

exports.init = async function () {
    if (await User.countDocuments({"username": "test@koibanx.com"})) {
        return
    }

    let user = new User();
    user.username = "test@koibanx.com";
    user.password = "admin";
    await User.create(user);

    logger.info("Test User created")
}
