const { app } = require('../app')
const supertest = require('supertest')
const api = supertest(app)

const initialStores = [
    {
        "name": "Marta Howard",
        "active": false,
        "currentBalance": "$2,304.71",
        "cuit": 68882734560,
        "registered": "2019-10-03T03:22:42 +03:00",
        "concepts": []
    },
    {
        "name": "Mullen Booker",
        "active": true,
        "currentBalance": "$1,227.27",
        "cuit": 52005633288,
        "registered": "2021-03-05T03:05:45 +03:00",
        "concepts": []
    },
    {
        "name": "Eula Swanson",
        "active": true,
        "currentBalance": "$1,676.66",
        "cuit": 50316847976,
        "registered": "2021-03-13T03:47:07 +03:00",
        "concepts": []
    },
    {
        "name": "Paulette Floyd",
        "active": false,
        "currentBalance": "$2,320.80",
        "cuit": 55102766683,
        "registered": "2019-12-01T04:39:18 +03:00",
        "concepts": []
    },
    {
        "name": "Donaldson Larson",
        "active": true,
        "currentBalance": "$1,614.21",
        "cuit": 56131767359,
        "registered": "2015-04-16T11:32:22 +03:00",
        "concepts": []
    },
    {
        "name": "Kate Hahn",
        "active": true,
        "currentBalance": "$1,140.04",
        "cuit": 32662590242,
        "registered": "2015-06-09T12:37:54 +03:00",
        "concepts": []
    },
    {
        "name": "Hood Charles",
        "active": true,
        "currentBalance": "$2,336.97",
        "cuit": 80156246917,
        "registered": "2014-10-18T08:07:52 +03:00",
        "concepts": []
    },
    {
        "name": "Gena Gentry",
        "active": false,
        "currentBalance": "$2,650.32",
        "cuit": 89408613101,
        "registered": "2019-12-13T06:29:04 +03:00",
        "concepts": []
    },
    {
        "name": "Wells Peck",
        "active": false,
        "currentBalance": "$2,115.92",
        "cuit": 14418738637,
        "registered": "2020-07-02T10:10:40 +03:00",
        "concepts": []
    },
    {
        "name": "Witt Shaw",
        "active": true,
        "currentBalance": "$2,492.29",
        "cuit": 19735783618,
        "registered": "2020-05-23T09:47:19 +03:00",
        "concepts": []
    },
    {
        "name": "Esperanza Roman",
        "active": true,
        "currentBalance": "$1,483.91",
        "cuit": 12984867004,
        "registered": "2015-03-17T03:18:51 +03:00",
        "concepts": []
    }
]

module.exports = {
    api,
    initialStores,
}