const {
    getStores,
    createStore,
    storeFormatter,
    activeFormatter,
    lastSaleFormatter,
    currentBalanceFormatter,
    calcateTotalPages,
    calculatePageToSkip
} = require('../services/stores');

const storeForStoreFormatter = {
    "name": "Esperanza Roman",
    "active": true,
    "currentBalance": 1483,
    "cuit": 12984867004,
    "lastSale": "2015-03-17T03:18:51 +03:00",
    "concepts": []
}

describe('currentBalanceFormatter', () => {
    test('of "20000" should be "$20.000"', () => {
        expect(currentBalanceFormatter(20000)).toBe('$20,000.00')
    })
    test('of "--99954.45" should be "-$9,994.00"', () => {
        expect(currentBalanceFormatter(-9994)).toBe('-$9,994.00')
    })
})

describe('lastSaleFormatter', () => {
    test('of "2021-08-06T16:58:53.429Z" should be "2021/08/06"', () => {
        expect(lastSaleFormatter('2021-08-06T16:58:53.429Z')).toBe('2021/08/06')
    })
})

describe('activeFormatter', () => {
    test('of "true" should be "Si"', () => {
        expect(activeFormatter(true)).toBe('Si')
    })
    test('of "false" should be "No"', () => {
        expect(activeFormatter(false)).toBe('No')
    })
})

describe('storeFormatter', () => {
    test('of a store must be the same store with lastSale, active, currentBalance formatted', () => {
        expect(storeFormatter(storeForStoreFormatter)).toStrictEqual({
            "name": "Esperanza Roman",
            "active": 'Si',
            "currentBalance": "$1,483.00",
            "cuit": 12984867004,
            "lastSale": "2015/03/17",
            "concepts": []
        })
    })
})

describe('calcateTotalPages', () => {
    test('of total = 101 and limit = 10', () => {
        expect(calcateTotalPages(101, 10)).toBe(11)
    })

    test('of total = 100 and limit = 0', () => {
        expect(calcateTotalPages(101, 10)).toBe(11)
    })
})
