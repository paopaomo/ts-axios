import cookie from '../../src/helpers/cookie';

describe('helpers: cookie', () => {
  test('should read cookies', () => {
    document.cookie = 'foo=a';
    expect(cookie.read('foo')).toBe('a');
  });

  test('should return null if cookie name is not exist', () => {
    document.cookie = 'foo=a';
    expect(cookie.read('bar')).toBeNull();
  });
});
