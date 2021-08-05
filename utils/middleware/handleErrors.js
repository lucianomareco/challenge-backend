const ERROR_HANDLERS = {
  ValidationError: (res, { message }) =>
    res.status(409).send({ error: message }),

  defaultError: (res, error) => {
    console.error(error.name)
    res.status(500).end()
  }
}

module.exports = (err, req, res, next) => {
  const handler =
    ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError

  handler(res, err)
}