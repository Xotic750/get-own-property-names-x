import toObject from 'to-object-x';
import attempt from 'attempt-x';
import isArray from 'is-array-x';
import toStringTag from 'to-string-tag-x';
import arraySlice from 'array-slice-x';
import objectKeys from 'object-keys-x';

const ObjectCtr = {}.constructor;
const nGOPN = ObjectCtr.getOwnPropertyNames;
const nativeGOPN = typeof nGOPN === 'function' && nGOPN;

const isCorrectRes = function isCorrectRes(r, length) {
  return r.threw === false && isArray(r.value) && r.value.length === length;
};

const either = function either(r, a, b) {
  const x = r.value[0];
  const y = r.value[1];

  return (x === a && y === b) || (x === b && y === a);
};

const test1 = function test1() {
  const res = attempt(nativeGOPN, 'fo');

  return isCorrectRes(res, 3) && either(res, '0', '1') && res.value[2] === 'length';
};

const test2 = function test2() {
  const res = attempt(nativeGOPN, {a: 1, b: 2});

  return isCorrectRes(res, 2) && either(res, 'a', 'b');
};

export const implementation1 = function implementation1() {
  const win = typeof window === 'object' && window;
  const cachedWindowNames = win ? nativeGOPN(win) : [];

  return function getOwnPropertyNames(obj) {
    const val = toObject(obj);

    // IE bug where layout engine calls userland gOPN for cross-domain `window` objects
    if (win && win !== window && toStringTag(val) === '[object Window]') {
      const result = attempt(nativeGOPN, val);

      return result.threw ? arraySlice(cachedWindowNames) : result.value;
    }

    return nativeGOPN(val);
  };
};

export const implementation2 = function implementation2() {
  return function getOwnPropertyNames(obj) {
    return objectKeys(obj);
  };
};

const getImplementation = function getImplementation() {
  if (test1()) {
    return nativeGOPN;
  }

  if (test2()) {
    return implementation1();
  }

  return implementation2();
};

/**
 * This method creates an array of all properties (enumerable or not) found
 * directly upon a given object.
 *
 * @param {object} obj - The object whose enumerable and non-enumerable own
 *  properties are to be returned.
 * @throws {TypeError} If target is null or undefined.
 * @returns {Array} An array of strings that correspond to the properties found
 *  directly upon the given object.
 */
const getOPN = getImplementation();

export default getOPN;
