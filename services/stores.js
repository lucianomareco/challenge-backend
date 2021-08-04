const StoreSchema = require('../models/store');



const getStores = async (req, res) => {
    const params = req.query.q;
    const { page, limit } = JSON.parse(params);
    const total = await StoreSchema.count({});
    const pages = Math.ceil(total / limit);
    const storesFound = await StoreSchema.find().limit(limit);
    const response = {
        data: storesFound,
        pages: pages,
        limit: limit,
        total: total
    }
    res.send(response)
}

const createStore = async (req, res) => {
    console.log(req.body);
    const store = new StoreSchema(req.body);
    const storeSaved = await store.save();
    res.json(storeSaved);
};

module.exports = {
    getStores,
    createStore
}