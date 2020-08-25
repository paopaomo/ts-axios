import axios from '../src';
import mergeConfig from '../src/core/mergeConfig';

describe('mergeConfig', () => {
  const defaults = axios.defaults;

  test('should accept undefined for second argument', () => {
    expect(mergeConfig(defaults, undefined)).toEqual(defaults);
  });

  test('should accept an object for second argument', () => {
    expect(mergeConfig(defaults, {})).toEqual(defaults);
  });

  test('should not leave references', () => {
    const merged = mergeConfig(defaults, {});
    expect(merged).not.toBe(defaults);
    expect(merged.headers).not.toBe(defaults.headers);
  });

  test('should allow setting request options', () => {
    const config = {
      url: '__sample url__',
      params: '__sample params__',
      data: { foo: true }
    };
    const merged = mergeConfig(defaults, config);
    expect(merged.url).toBe(config.url);
    expect(merged.params).toBe(config.params);
    expect(merged.data).toEqual(config.data);
  });

  test('should not inherit request options', () => {
    const config = {
      url: '__sample url__',
      params: '__sample params__',
      data: { foo: true }
    };
    const merged = mergeConfig(config, {});
    expect(merged.url).toBeUndefined();
    expect(merged.params).toBeUndefined();
    expect(merged.data).toBeUndefined();
  });

  test('should return default headers if pass config2 with undefined', () => {
    const config = {
      headers: 'x-mock-header'
    };
    const merged = mergeConfig(config, undefined);
    expect(merged).toEqual(config);
  });

  test('should merge auth, headers with defaults', () => {
    const config1 = {
      auth: undefined
    };
    const config2 = {
      auth: {
        username: 'Zi',
        password: '123456'
      }
    };
    const config3 = {
      auth: {
        username: 'Jerry',
        password: '789012'
      }
    };
    const merged1 = mergeConfig(config1, config2);
    const merged2 = mergeConfig(config2, config3);
    expect(merged1).toEqual(config2);
    expect(merged2).toEqual(config3);
  });

  test('should overwrite auth, headers with a non-object value', () => {
    const config = {
      headers: {
        common: {
          Accept: 'application/json, text/plain, */*'
        }
      }
    };
    const configWithNullHeaders = { headers: null };
    const merge = mergeConfig(config, configWithNullHeaders);
    expect(merge).toEqual(configWithNullHeaders);
  });

  test('should allow setting other options', () => {
    const merged = mergeConfig(defaults, { timeout: 2000 });
    expect(merged.timeout).toBe(2000);
  });
});
