module.exports = {
  getErrorObject({ message, statusCode }) {
    return {
      message,
      statusCode,
    }
  },

  throwError({
    message,
    statusCode,
  }) {
    throw {
      message,
      statusCode,
    };
  },
}
