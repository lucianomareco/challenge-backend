class QueryValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'QueryValidationError';
    }
}

module.exports = QueryValidationError;