'use strict';

var getOwnPropertyNames;
if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');
  if (typeof JSON === 'undefined') {
    JSON = {};
  }
  require('json3').runInContext(null, JSON);
  require('es6-shim');
  var es7 = require('es7-shim');
  Object.keys(es7).forEach(function (key) {
    var obj = es7[key];
    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  getOwnPropertyNames = require('../../index.js');
} else {
  getOwnPropertyNames = returnExports;
}

var win = typeof window !== 'undefined' && window;
var doc = typeof document !== 'undefined' && document;
var ifBrowserIt = win && doc ? it : xit;

describe('getOwnPropertyNames', function () {
  it('is a function', function () {
    expect(typeof getOwnPropertyNames).toBe('function');
  });

  it('should throw when target is null or undefined', function () {
    expect(function () {
      getOwnPropertyNames();
    }).toThrow();

    expect(function () {
      getOwnPropertyNames(void 0);
    }).toThrow();

    expect(function () {
      getOwnPropertyNames(null);
    }).toThrow();
  });

  it('should not throw for primitives', function () {
    var values = [
      1,
      true,
      'abc',
      NaN,
      Infinity,
      -Infinity
    ];

    values.map(getOwnPropertyNames);
  });

  it('should return an array matching that of an es-shimmed environment', function () {
    var values = [
      1,
      true,
      'abc',
      [],
      {},
      function () {},
      /abc/,
      new Date()
    ];

    var expected = values.map(function (item) {
      return Object.getOwnPropertyNames(Object(item));
    });

    var actual = values.map(getOwnPropertyNames);

    expect(actual).toEqual(expected);
  });

  ifBrowserIt('does not break when an iframe is added', function () {
    var div = doc.createElement('div');
    var iframe = doc.createElement('iframe');
    iframe.src = 'http://xkcd.com';
    div.appendChild(iframe);
    doc.body.appendChild(div);
    setTimeout(function () {
      doc.body.removeChild(div);
    }, 0);

    expect(Array.isArray(getOwnPropertyNames(win))).toBe(true);
  });
});
