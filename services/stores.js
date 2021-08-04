const StoreSchema = require('../models/store');

const getData = async (limit, page) => {
    const dataFound = await StoreSchema.find().limit(limit);
    return dataFound;
}

module.exports = {
    getData
}