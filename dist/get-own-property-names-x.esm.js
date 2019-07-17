function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import toObject from 'to-object-x';
import attempt from 'attempt-x';
import isArray from 'is-array-x';
import toStringTag from 'to-string-tag-x';
import arraySlice from 'array-slice-x';
import objectKeys from 'object-keys-x';
var ObjectCtr = {}.constructor;
var nGOPN = ObjectCtr.getOwnPropertyNames;
var nativeGOPN = typeof nGOPN === 'function' && nGOPN;
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

var getOPN;

if (nativeGOPN) {
  var isCorrectRes = function isCorrectRes(r, length) {
    return r.threw === false && isArray(r.value) && r.value.length === length;
  };

  var either = function either(r, a, b) {
    var x = r.value[0];
    var y = r.value[1];
    return x === a && y === b || x === b && y === a;
  };

  var res = attempt(nativeGOPN, 'fo');

  if (isCorrectRes(res, 3) && either(res, '0', '1') && res.value[2] === 'length') {
    getOPN = nativeGOPN;
  } else {
    res = attempt(nativeGOPN, {
      a: 1,
      b: 2
    });

    if (isCorrectRes(res, 2) && either(res, 'a', 'b')) {
      var win = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window;
      var cachedWindowNames = win ? nativeGOPN(win) : [];

      getOPN = function getOwnPropertyNames(obj) {
        var val = toObject(obj); // IE bug where layout engine calls userland gOPN for cross-domain `window` objects

        if (win && win !== window && toStringTag(val) === '[object Window]') {
          var result = attempt(nativeGOPN, val);
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

var gopn = getOPN;
export default gopn;

//# sourceMappingURL=get-own-property-names-x.esm.js.map