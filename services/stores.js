const StoreSchema = require('../models/store');
const DomainError = require('../utils/errors/domainError');


const getStores = async (req, res, next) => {
    try {
        const { page, limit } = JSON.parse(req.query.q);
        const total = await StoreSchema.countDocuments({});
        const pages = calcateTotalPages(total, limit);
        const docsToSkip = calculatePageToSkip(limit, page);
        const storesFound = await StoreSchema.find().skip(docsToSkip).limit(limit);
        const storesFormatted = formatAllStores(storesFound);
        const response = {
            data: storesFormatted,
            page: page,
            pages: pages,
            limit: limit,
            total: total
        }
        res.send(response)
    } catch (err) {
        next(err);
    }
}

const calcateTotalPages = (total, limit) => {
    if (limit == 0) {
        throw new DomainError("If limit is 0, the number of pages will be infinite");
    }
    return Math.ceil(total / limit);
}

const calculatePageToSkip = (limit, page) => {
    return limit * (page - 1);
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
    const storesFormatted = stores.map(store => storeFormatter(store))
    return storesFormatted;
}

const storeFormatter = store => {
    const storeString = JSON.stringify(store);
    let storeJson = JSON.parse(storeString);

    storeJson.currentBalance = currentBalanceFormatter(storeJson.currentBalance);

    storeJson.active = activeFormatter(storeJson.active);

    storeJson.lastSale = lastSaleFormatter(storeJson.lastSale);

    return storeJson;
}


const currentBalanceFormatter = value => {

    const numberFormater = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
    return numberFormater.format(value);
}

const activeFormatter = value => {
    value
        ? value = 'Si'
        : value = 'No';
    return value
}

const lastSaleFormatter = value => {
    return value.slice(0, 10).replace(new RegExp('-', "g"), '/')
}

module.exports = {
    getStores,
    createStore,
    storeFormatter,
    activeFormatter,
    lastSaleFormatter,
    currentBalanceFormatter,
    calcateTotalPages,
    calculatePageToSkip
}