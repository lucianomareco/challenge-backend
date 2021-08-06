const validateStoresQuery = (req, res, next) => {
    try {
        const regexQuery = /( *{ *"page" *: *) *(\d)+ *(, *"limit" *: *) *(\d)+ *}/;
        if (!regexQuery.test(req.query.q)) {
            throw new QueryValidationError('query follows q={"page": 5 ,"limit" : 100} format');
        }
        next();
    } catch (err) {
        next(err);
    }
}



module.exports = validateStoresQuery