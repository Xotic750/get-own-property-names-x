import toObject from 'to-object-x';

const nativeGOPN = typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames;

let getOPN;

if (nativeGOPN) {
  const attempt = require('attempt-x');
  const isArray = require('is-array-x');
  const isCorrectRes = function _isCorrectRes(r, length) {
    return r.threw === false && isArray(r.value) && r.value.length === length;
  };

  const either = function _either(r, a, b) {
    const x = r.value[0];
    const y = r.value[1];

    return (x === a && y === b) || (x === b && y === a);
  };

  let res = attempt(nativeGOPN, 'fo');

  if (isCorrectRes(res, 3) && either(res, '0', '1') && res.value[2] === 'length') {
    getOPN = nativeGOPN;
  } else {
    res = attempt(nativeGOPN, {a: 1, b: 2});

    if (isCorrectRes(res, 2) && either(res, 'a', 'b')) {
      const toStringTag = require('to-string-tag-x');
      const arraySlice = require('array-slice-x');
      const win = typeof window === 'object' && window;
      const cachedWindowNames = win ? nativeGOPN(win) : [];

      getOPN = function getOwnPropertyNames(obj) {
        const val = toObject(obj);

        // IE bug where layout engine calls userland gOPN for cross-domain `window` objects
        if (win && win !== window && toStringTag(val) === '[object Window]') {
          const result = attempt(nativeGOPN, val);

          return result.threw ? arraySlice(cachedWindowNames) : result.value;
        }

        return nativeGOPN(val);
      };
    }
  }
}

if (typeof getOPN !== 'function') {
  const objectKeys = require('object-keys-x');
  getOPN = function getOwnPropertyNames(obj) {
    return objectKeys(obj);
  };
}

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
export default getOPN;
