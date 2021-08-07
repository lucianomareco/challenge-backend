const DomainError = require('../utils/errors/domainError');
const ValidationError = require('../utils/errors/validationError');

const {
    storeFormatter,
    activeFormatter,
    lastSaleFormatter,
    currentBalanceFormatter,
    calcateTotalPages,
    calculatePageToSkip
} = require('../services/stores');

const {
    validateStore,
    validateLastSale,
    validateConcepts,
    validateCuit,
    validateCurrentBalance,
    validateName,
    validateActive
} = require('../utils/middlewares/validateStore');

const storeForStoreFormatter = {
    "name": "Esperanza Roman",
    "active": true,
    "currentBalance": 1483,
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
            "concepts": [{
                "number": 1,
                "value": 41,
            },
            {
                "number": 2,
                "value": 54,
            },

            {
                "number": 3,
                "value": 10,
            },
            {
                "number": 4,
                "value": 3,
            },
            {
                "number": 5,
                "value": 78,
            },
            {
                "number": 6,
                "value": 98,
            }
            ]
        })
    })
})

describe('calcateTotalPages', () => {
    test('of total = 101 and limit = 10 should be "11"', () => {
        expect(calcateTotalPages(101, 10)).toBe(11)
    })
    test('of limit = 0 should throw a DomainError  ', () => {
        expect(() => calcateTotalPages(100, 0)).toThrow(DomainError);
    })
})

describe('calculatePageToSkip', () => {
    test('of limit = 5 and page = 21 should be 100', () => {
        expect(calculatePageToSkip(5, 21)).toBe(100);
    })
})

describe('validateLastSale', () => {
    test('of 2015/04/30 should not throw a ValidationError', () => {
        expect(() => validateLastSale('2015/04/30')).not.toThrow(ValidationError)
    })
    test('of 2015/04/32 should throw a ValidationError', () => {
        expect(() => validateLastSale('2015/04/32')).toThrow(ValidationError)
    })
    test('of 2015-04-32 should throw a ValidationError', () => {
        expect(() => validateLastSale('2015-04-32')).toThrow(ValidationError)
    })
    test('of undefined should throw a ValidationError', () => {
        expect(() => validateLastSale()).toThrow(ValidationError)
    })
})

describe('validateCurrentBalance', () => {
    test('of 1000 should not throw a ValidationError', () => {
        expect(() => validateCurrentBalance(1000)).not.toThrow(ValidationError)
    })
    test('of undefined should not throw a ValidationError', () => {
        expect(() => validateCurrentBalance()).toThrow(ValidationError)
    })
    test('of string should not throw a ValidationError', () => {
        expect(() => validateCurrentBalance('1000')).toThrow(ValidationError)
    })
})

describe('validateActive', () => {
    test('of true should not throw a ValidationError', () => {
        expect(() => validateActive(true)).not.toThrow(ValidationError)
    })
    test('of a string should throw a ValidationError', () => {
        expect(() => validateActive('true')).toThrow(ValidationError)
    })
    test('of undefined should throw a ValidationError', () => {
        expect(() => validateActive()).toThrow(ValidationError)
    })
})

describe('validateName', () => {
    test('of valid name should not throw a ValidationError', () => {
        expect(() => validateName('Monica Lopez 84')).not.toThrow(ValidationError)
    })
    test('of invalid name should throw a ValidationError', () => {
        expect(() => validateName('Monica lopez 84 $')).toThrow(ValidationError)
    })

    test('of undefined should throw a ValidationError', () => {
        expect(() => validateName()).toThrow(ValidationError)
    })
})

describe('validateConcepts', () => {
    test('of valid concepts should not throw a ValidationError', () => {
        expect(() => validateConcepts([
            {
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
            }
        ])).not.toThrow(ValidationError);
    })
    test('of invalid concepts should throw a ValidationError', () => {
        expect(() => validateConcepts([])).toThrow(ValidationError);
    })
})

describe('validateCuil', () => {
    test('of a cuil with 11 digits should not throw a Validarion Error', () => {
        expect(() => validateCuit('20423533049')).not.toThrow(ValidationError);
    })
    test('of a cuil with 12 digits should throw a Validarion Error', () => {
        expect(() => validateCuit('204235330499')).toThrow(ValidationError);
    })
    test('of undefined should throw a Validarion Error', () => {
        expect(() => validateCuit('204235330499')).toThrow(ValidationError);
    })
    test('of a cuil with invalid characters should throw a Validarion Error', () => {
        expect(() => validateCuit('20423533!499')).toThrow(ValidationError);
    })
})

