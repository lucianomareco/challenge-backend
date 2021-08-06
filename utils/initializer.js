const User = require('../models/user')
const logger = require('../utils/logger')
const StoreSchema = require('../models/store');

exports.init = async function () {

    seed();

    if (await User.countDocuments({ "username": "test@koibanx.com" })) {
        return
    }

    let user = new User();
    user.username = "test@koibanx.com";
    user.password = "admin";
    await User.create(user);

    logger.info("Test User created")
}


const seed = async () => {
    for (let i = 0; i < 50; i++) {
        const store = new StoreSchema;
        store.name = `Name${i}`;
        store.cuit = `11122233344`;
        store.concept = [];
        store.currentBalance = i;
        store.active = true;
        store.lastSale = '2020/01/23';
        await store.save();
    };
}