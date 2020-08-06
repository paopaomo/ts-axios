import { buildURL, combineURL, isAbsoluteURL, isURLSameOrigin } from '../../src/helpers/url';

describe('helpers: url', () => {
  describe('buildURL', () => {
    test('should support null params', () => {
      expect(buildURL('/foo')).toBe('/foo');
    });

    test('should support params', () => {
      expect(buildURL('/foo', { bar: 'baz' })).toBe('/foo?bar=baz');
    });

    test('should ignore if some param value is null', () => {
      expect(
        buildURL('/foo', {
          bar: 'baz',
          baz: null
        })
      ).toBe('/foo?bar=baz');
    });

    test('should ignore if the only param value is null', () => {
      expect(buildURL('/foo', { bar: null })).toBe('/foo');
    });

    test('should support object params', () => {
      expect(buildURL('/foo', { bar: { baz: 'boo' } })).toBe(
        `/foo?bar=${encodeURI('{"baz":"boo"}')}`
      );
    });

    test('should support data params', () => {
      const date = new Date();
      expect(buildURL('/foo', { date })).toBe(`/foo?date=${date.toISOString()}`);
    });

    test('should support array params', () => {
      expect(buildURL('/foo', { bar: ['baz', 'boo'] })).toBe('/foo?bar[]=baz&bar[]=boo');
    });

    test('should support special char params', () => {
      expect(buildURL('/foo', { bar: '@:$, ' })).toBe('/foo?bar=@:$,+');
    });

    test('should support existing params', () => {
      expect(buildURL('/foo?bar=baz', { baz: 'boo' })).toBe('/foo?bar=baz&baz=boo');
    });

    test('should correct discard url hash mark', () => {
      expect(buildURL('/foo?bar=baz#', { baz: 'boo' })).toBe('/foo?bar=baz&baz=boo');
    });

    test('should use serializer if provided', () => {
      const serializer = jest.fn(() => {
        return 'bar=baz';
      });
      const params = { baz: 'boo' };
      expect(buildURL('/foo', params, serializer)).toBe('/foo?bar=baz');
      expect(serializer).toHaveBeenCalled();
      expect(serializer).toHaveBeenCalledWith(params);
    });

    test('should support URLSearchParams', () => {
      expect(buildURL('/foo', new URLSearchParams('bar=baz'))).toBe('/foo?bar=baz');
    });
  });

  describe('isURLSameOrigin', () => {
    test('should detect same origin', () => {
      expect(isURLSameOrigin(window.location.href)).toBeTruthy();
    });

    test('should detect different origin', () => {
      expect(isURLSameOrigin('https://api.github.com')).toBeFalsy();
    });
  });

  describe('isAbsoluteURL', () => {
    test('should return true if URL begins with valid schema name', () => {
      expect(isAbsoluteURL('https://api.github.com/')).toBeTruthy();
      expect(isAbsoluteURL('custom-schema-v1.0://example.com')).toBeTruthy();
      expect(isAbsoluteURL('HTTP://example.com')).toBeTruthy();
    });

    test('should return false if URL begins with invalid schema name', () => {
      expect(isAbsoluteURL('123://example/com')).toBeFalsy();
      expect(isAbsoluteURL('!valid://example/com')).toBeFalsy();
    });

    test('should return true if URL is protocol-relative', () => {
      expect(isAbsoluteURL('//example.com')).toBeTruthy();
    });

    test('should return false is URL is relative', () => {
      expect(isAbsoluteURL('/foo')).toBeFalsy();
      expect(isAbsoluteURL('foo')).toBeFalsy();
    });
  });

  describe('combineURL', () => {
    test('should combine URL', () => {
      expect(combineURL('https://api.github.com', '/users')).toBe('https://api.github.com/users');
    });

    test('should remove duplicate slashes', () => {
      expect(combineURL('https://api.github.com/', '/users')).toBe('https://api.github.com/users');
    });

    test('should insert missing slash', () => {
      expect(combineURL('https://api.github.com', 'users')).toBe('https://api.github.com/users');
    });

    test('should not insert slash when relative url missing/empty', () => {
      expect(combineURL('https://api.github.com')).toBe('https://api.github.com');
      expect(combineURL('https://api.github.com', '')).toBe('https://api.github.com');
    });

    test('should allow a single slash for relative', () => {
      expect(combineURL('https://api.github.com/')).toBe('https://api.github.com/');
    });
  });
});
