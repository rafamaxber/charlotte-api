const { throwError, getErrorObject } = require('../utils/helperError');

describe('helperError', () => {
  describe('throwError', () => {
    test('Should return throw', () => {
      expect(() => {
        throwError({
          message: 'Mensagem de erro default',
          statusCode: 404,
        })
      }).toThrow({
        message: 'Mensagem de erro default',
        statusCode: 404,
      });

    });
  });

  describe('getErrorObject', () => {
    test('Should return throw', () => {
      expect(getErrorObject({
        message: 'Mensagem de erro default',
        statusCode: 404,
      })).toEqual({
        message: 'Mensagem de erro default',
        statusCode: 404,
      });

    });
  });

});
