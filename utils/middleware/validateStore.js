class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

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

    if (name == null) {
        throw new ValidationError('Name is required');
    } else if (!regexName.test(name))
        throw new ValidationError('Name only can contain letras, numbers and spaces');
};

const validateCuit = cuit => {
    const regexCuit = /^[0-9]{11}$/;

    if (cuit == null) {
        throw new ValidationError('Cuit is required');
    } else if (!regexCuit.test(cuit))
        throw new ValidationError('Cuit must have 11 digits');
}

const validateConcepts = concepts => {
    if (concepts == null) {
        throw new ValidationError('Concepts is required');
    } else if (!Array.isArray(concepts))
        throw new ValidationError('Concepts must be an array');
}

const validateCurrentBalance = currentBalance => {
    if (currentBalance == null) {
        throw new ValidationError('Current balance is required');
    } else if (!typeOf(currentBalance) === Number)
        throw new ValidationError('Current balance must be a number');
}

const validateActive = active => {
    if (active == null) {
        throw new ValidationError('Active is required');
    } else if (!(active === 'Sí' || active === 'Si' || active === 'No')) {
        throw new ValidationError('Active must be "Sí" or "No"');
    }
}

const validateLastSale = date => {
    const regexDate = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/;

    if (date == null) {
        throw new ValidationError('Last sale is required');
    }
    if (!regexDate.test(date))
        throw new ValidationError('Last sale follows dd/mm/yy format');
}

module.exports = {
    validateStore
}