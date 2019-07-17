import toObject from 'to-object-x';
import attempt from 'attempt-x';
import isArray from 'is-array-x';
import toStringTag from 'to-string-tag-x';
import arraySlice from 'array-slice-x';
import objectKeys from 'object-keys-x';

const ObjectCtr = {}.constructor;
const nGOPN = ObjectCtr.getOwnPropertyNames;
const nativeGOPN = typeof nGOPN === 'function' && nGOPN;

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
let getOPN;

if (nativeGOPN) {
  const isCorrectRes = function isCorrectRes(r, length) {
    return r.threw === false && isArray(r.value) && r.value.length === length;
  };

  const either = function either(r, a, b) {
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
  getOPN = function getOwnPropertyNames(obj) {
    return objectKeys(obj);
  };
}

const gopn = getOPN;

export default gopn;
