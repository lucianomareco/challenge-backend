const ERROR_HANDLERS = {
  ValidationError: (res, { message }) =>
    res.status(409).send({ error: message }),

  DomainError: (res, { message }) =>
    res.status(409).send({ error: message }),

  QueryValidationError: (res, { message }) =>
    res.status(409).send({ error: message }),

  MongoError: (res) =>
    res.status(409).send({ error: 'invalid query' }),

  defaultError: (res, error) => {
    console.error(error.name)
    console.error(error.message)
    res.status(500).send("Internal error")
  }
}

module.exports = (err, req, res, next) => {
  const handler =
    ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError

  handler(res, err)
}