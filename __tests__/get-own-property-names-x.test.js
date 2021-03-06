import $P, {implementation1, implementation2} from '../src/get-own-property-names-x';

const win = typeof window !== 'undefined' && window;
const doc = typeof document !== 'undefined' && document;
const ifBrowserIt = win && doc ? it : xit;

[$P, implementation1, implementation2].forEach((getOwnPropertyNames, tetNum) => {
  describe(`getOwnPropertyNames ${tetNum}`, function() {
    it('is a function', function() {
      expect.assertions(1);
      expect(typeof getOwnPropertyNames).toBe('function');
    });

    it('should throw when target is null or undefined', function() {
      expect.assertions(3);
      expect(function() {
        getOwnPropertyNames();
      }).toThrowErrorMatchingSnapshot();

      expect(function() {
        getOwnPropertyNames(void 0);
      }).toThrowErrorMatchingSnapshot();

      expect(function() {
        getOwnPropertyNames(null);
      }).toThrowErrorMatchingSnapshot();
    });

    it('should not throw for primitives', function() {
      expect.assertions(1);
      const values = [1, true, 'abc', NaN, Infinity, -Infinity];

      values.map(getOwnPropertyNames);
      expect(true).toBe(true);
    });

    it('should return an array matching that of an es-shimmed environment', function() {
      expect.assertions(1);
      const values = [1, true, 'abc', [], {}, function() {}, /abc/, new Date()];

      const expected = values.map(function(item) {
        const obj = Object(item);

        return getOwnPropertyNames === implementation2 ? Object.keys(obj) : Object.getOwnPropertyNames(obj);
      });

      const actual = values.map(getOwnPropertyNames);

      expect(actual).toStrictEqual(expected);
    });

    ifBrowserIt('does not break when an iframe is added', function() {
      const div = doc.createElement('div');
      const iframe = doc.createElement('iframe');
      iframe.src = 'http://xkcd.com';
      div.appendChild(iframe);
      doc.body.appendChild(div);
      setTimeout(function() {
        doc.body.removeChild(div);
      }, 0);

      expect(Array.isArray(getOwnPropertyNames(win))).toBe(true);
    });
  });
});
