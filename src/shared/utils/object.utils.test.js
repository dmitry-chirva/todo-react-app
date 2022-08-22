import { debounce, isObject } from './object.utils';

describe("objectUtils", () => {
  jest.useFakeTimers();

  describe("isObject should", () => {
    it("not return true when property is array", () => {
      expect(isObject([])).toBeFalsy();
    });
    it("not return true when property is function", () => {
      expect(isObject(() => { })).toBeFalsy();
    });
    it("not return true when property is empty", () => {
      expect(isObject()).toBeFalsy();
    });
    it("not return true when property is number", () => {
      expect(isObject(123)).toBeFalsy();
    });
    it("not return true when property is string", () => {
      expect(isObject('123')).toBeFalsy();
    });

    it("return true when property is object", () => {
      expect(isObject({})).toBeTruthy();
    });
  });

  describe("debounce should", () => {
    let debouncedFunc;
    let func;
    beforeEach(() => {
      func = jest.fn();
      debouncedFunc = debounce(func, 1000);
    });

    it('execute just once', () => {
      for (let i = 0; i < 100; i++) {
        debouncedFunc();
      }
      jest.runAllTimers();
      expect(func).toBeCalledTimes(1);
    });

  });
})