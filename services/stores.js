const StoreSchema = require('../models/store');

const getStores = async (req, res) => {
    const params = req.query.q;
    const { page, limit } = JSON.parse(params);
    const storesFound = await StoreSchema.find().limit(limit);
    res.send(storesFound)
}

module.exports = {
    getStores
}