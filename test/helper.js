const { app } = require('../app')
const supertest = require('supertest')
const api = supertest(app)


const invalidStore = {
    "name": "Esperanza Roman",
    "active": true,
    "currentBalance": '148!&3',
    "cuit": 12984867004,
    "lastSale": "2015-03-17T03:18:51 +03:00",
    "concepts": [{
        "number": 2,
        "value": 54,
    },
    {
        "number": 1,
        "value": 41,
    },
    {
        "number": 3,
        "value": 10,
    },
    {
        "number": 5,
        "value": 78,
    },
    {
        "number": 6,
        "value": 98,
    },
    {
        "number": 4,
        "value": 3,
    }]
};

const validStore = {
    "name": "luciano",
    "cuit": "20423533049",
    "concepts": [
        {
            "number": 2,
            "value": 145
        },
        {
            "number": 1,
            "value": 1981
        },
        {
            "number": 3,
            "value": 489
        },
        {
            "number": 4,
            "value": 45
        },
        {
            "number": 5,
            "value": 156
        },
        {
            "number": 6,
            "value": 15
        }
    ],
    "currentBalance": 2000000,
    "active": true,
    "lastSale": "2020/12/20"
}

module.exports = {
    api,
    invalidStore,
    validStore
}