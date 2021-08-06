const StoreSchema = require('../models/store');



const getStores = async (req, res, next) => {
    try {
        const { page, limit } = JSON.parse(req.query.q);
        const total = await StoreSchema.countDocuments({});
        const pages = Math.ceil(total / limit);
        const docsToSkip = limit * (page - 1);
        const storesFound = await StoreSchema.find().skip(docsToSkip).limit(limit);
        const storesFormatted = formatAllStores(storesFound);
        const response = {
            data: storesFormatted,
            page: page,
            pages: pages - 1,
            limit: limit,
            total: total
        }
        res.send(response)
    } catch (err) {
        next(err);
    }
}

const createStore = async (req, res, next) => {
    try {
        const store = new StoreSchema(req.body);
        let storeSaved = await store.save();
        const storeFormatted = storeFormatter(storeSaved);
        res.status(201).json(storeFormatted);
    } catch (err) {
        next(err);
    }
};

const formatAllStores = stores => {
    console.log('entro al fromatAllStore')
    const storesFormatted = stores.map(store => storeFormatter(store))
    return storesFormatted;
}

const storeFormatter = store => {
    console.log(typeof (store))
    const storeString = JSON.stringify(store);
    let storeJson = JSON.parse(storeString);

    const numberFormater = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    storeJson.currentBalance = numberFormater.format(storeJson.currentBalance);

    storeJson.active
        ? storeJson.active = 'Si'
        : storeJson.active = 'No';

    storeJson.lastSale = storeJson.lastSale.slice(0, 10).replace(new RegExp('-', "g"), '/');
    console.log(storeJson)
    return storeJson;
}

module.exports = {
    getStores,
    createStore
}

