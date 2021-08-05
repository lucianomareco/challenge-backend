const StoreSchema = require('../models/store');



const getStores = async (req, res) => {
    const { page, limit } = JSON.parse(req.query.q);
    const total = await StoreSchema.countDocuments({});
    const pages = Math.ceil(total / limit);
    const docsToSkip = limit * (page - 1);
    const storesFound = await StoreSchema.find().skip(docsToSkip).limit(limit);
    const response = {
        data: storesFound,
        page: page,
        pages: pages - 1,
        limit: limit,
        total: total
    }
    res.send(response)
}

const createStore = async (req, res) => {
    const store = new StoreSchema(req.body);
    const storeSaved = await store.save();
    res.json(storeSaved);
};

module.exports = {
    getStores,
    createStore
}