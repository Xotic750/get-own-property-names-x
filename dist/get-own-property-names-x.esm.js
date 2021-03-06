function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import toObject from 'to-object-x';
import attempt from 'attempt-x';
import isArray from 'is-array-x';
import toStringTag from 'to-string-tag-x';
import arraySlice from 'array-slice-x';
import objectKeys from 'object-keys-x';
var ObjectCtr = {}.constructor;
var nGOPN = ObjectCtr.getOwnPropertyNames;
var nativeGOPN = typeof nGOPN === 'function' && nGOPN;

var isCorrectRes = function isCorrectRes(r, length) {
  return r.threw === false && isArray(r.value) && r.value.length === length;
};

var either = function either(args) {
  var _args = _slicedToArray(args, 3),
      r = _args[0],
      a = _args[1],
      b = _args[2];

  var x = r.value[0];
  var y = r.value[1];
  return x === a && y === b || x === b && y === a;
};

var test1 = function test1() {
  var res = attempt(nativeGOPN, 'fo');
  return isCorrectRes(res, 3) && either([res, '0', '1']) && res.value[2] === 'length';
};

var test2 = function test2() {
  var res = attempt(nativeGOPN, {
    a: 1,
    b: 2
  });
  return isCorrectRes(res, 2) && either([res, 'a', 'b']);
};

var win = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window;
var cachedWindowNames = win ? nativeGOPN(win) : [];
export var implementation1 = function getOwnPropertyNames(obj) {
  var val = toObject(obj); // IE bug where layout engine calls userland gOPN for cross-domain `window` objects

  if (win && win !== window && toStringTag(val) === '[object Window]') {
    var result = attempt(nativeGOPN, val);
    return result.threw ? arraySlice(cachedWindowNames) : result.value;
  }

  return nativeGOPN(val);
};
export var implementation2 = function getOwnPropertyNames(obj) {
  return objectKeys(obj);
};

var getImplementation = function getImplementation() {
  if (test1()) {
    return nativeGOPN;
  }

  return test2() ? implementation1 : implementation2;
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


var getOPN = getImplementation();
export default getOPN;

//# sourceMappingURL=get-own-property-names-x.esm.js.map