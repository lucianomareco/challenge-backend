const ValidationError = require('../errors/validationError');

const validateStore = (req, res, next) => {
    try {
        const { name, cuit, concepts, currentBalance, active, lastSale } = req.body;
        validateName(name);
        validateCuit(cuit);
        validateConcepts(concepts);
        validateCurrentBalance(currentBalance);
        validateActive(active);
        validateLastSale(lastSale);
        next();
    } catch (err) {
        next(err);
    }
}

const validateName = name => {
    const regexName = /^[a-zA-Z-0-9 ]+$/;

    if (!name) {
        throw new ValidationError('name is required');
    } else if (!regexName.test(name))
        throw new ValidationError('name only can contain letras, numbers and spaces');
};

const validateCuit = cuit => {
    const regexCuit = /^[0-9]{11}$/;

    if (!cuit) {
        throw new ValidationError('cuit is required');
    } else if (!regexCuit.test(cuit))
        throw new ValidationError('cuit must have 11 digits');
}

const validateConcepts = concepts => {
    if (!concepts) {
        throw new ValidationError('concepts is required');
    }
    if (!Array.isArray(concepts))
        throw new ValidationError('concepts must be an array');
    if (concepts.length != 6)
        throw new ValidationError('concepts must have six elements');
    if (!validateNumbersOfConcepts(concepts))
        throw new ValidationError('the concepts must be numbered from 1 to 6');
    if (!validateValueOfConcepts(concepts))
        throw new ValidationError('the value of concepts must be a number');

}

const validateValueOfConcepts = concept => {
    return concept.every(concept => {
        return typeof concept.value == 'number';
    })
}


const validateNumbersOfConcepts = concepts => {
    let numbersOfConcept = concepts.map(concept => concept.number);
    var validNumbersOfConcept = [];
    for (let i = 1; i < 7; i++) {
        validNumbersOfConcept.push(i);
    }
    return JSON.stringify(validNumbersOfConcept) == JSON.stringify(numbersOfConcept);
}

const validateCurrentBalance = currentBalance => {
    if (!currentBalance) {
        throw new ValidationError('currentBalance is required');
    } else if (!(typeof currentBalance === 'number'))
        throw new ValidationError('currentBalance must be a number');
}

const validateActive = active => {
    if (!active) {
        throw new ValidationError('active is required');
    } else if (!(typeof active === 'boolean')) {
        throw new ValidationError('active must be true or false');
    }
}

const validateLastSale = date => {
    const regexDate = /^([0-9]{4})\/(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])$/;

    if (!date) {
        throw new ValidationError('lastSale is required');
    }
    if (!regexDate.test(date))
        throw new ValidationError('lastSale follows yyyy/mm/dd format');
}

module.exports = {
    validateStore,
    validateLastSale,
    validateConcepts,
    validateCuit,
    validateCurrentBalance,
    validateName,
    validateActive
}
