import { formatDate, isObject, toDcQueryStr, toQueryStr } from './index';

describe('utils', () => {
  describe('isObject', () => {
    it('should return true if passed and object', () => {
      expect(isObject({ test: 'value' })).toBe(true);
    });
    it('should return false if not passed and object', () => {
      expect(isObject('value')).toBe(false);
    });
  });
  describe('toQueryStr', () => {
    it('should return a query string', () => {
      expect(toQueryStr({ test: 'value' })).toMatchInlineSnapshot(
        `"?test=value"`
      );
    });
  });
  describe('toDcQueryStr', () => {
    it('should return a DC query string', () => {
      expect(toDcQueryStr({ test: 'value' })).toMatchInlineSnapshot(
        `"test:\\"value\\""`
      );
    });
  });
  describe('formatDate', () => {
    let realDateToLocaleDateString: () => string;
    let realDateToLocaleTimeString: () => string;
    beforeEach(() => {
      realDateToLocaleDateString = Date.prototype.toLocaleDateString.bind(
        global.Date
      );
      const toLocaleDateStringStub = jest.fn(() => '01/01/2020');
      global.Date.prototype.toLocaleDateString = toLocaleDateStringStub;
      realDateToLocaleTimeString = Date.prototype.toLocaleTimeString.bind(
        global.Date
      );
      const toLocaleTimeStringStub = jest.fn(() => '12:00 AM');
      global.Date.prototype.toLocaleTimeString = toLocaleTimeStringStub;
    });
    afterEach(() => {
      global.Date.prototype.toLocaleDateString = realDateToLocaleDateString;
      global.Date.prototype.toLocaleTimeString = realDateToLocaleTimeString;
    });
    it('should return a formatted date when passed a valid ISO date string', () => {
      expect(formatDate('2020-01-01T00:00:59Z')).toEqual('01/01/2020 12:00 AM');
    });
  });
});
