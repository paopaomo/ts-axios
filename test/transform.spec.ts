import axios, { AxiosResponse, AxiosTransformer } from '../src';
import { getAjaxRequest } from './helper';

describe('transform', () => {
  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  test('should transform JSON to string', () => {
    axios.post('/foo', {
      foo: 'bar'
    });

    return getAjaxRequest().then(request => {
      expect(request.params).toBe('{"foo":"bar"}');
    });
  });

  test('should transform string to JSON', done => {
    let response: AxiosResponse;

    axios('/foo').then(res => {
      response = res;
    });

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: '{"foo":"bar"}'
      });

      setTimeout(() => {
        expect(typeof response.data).toBe('object');
        expect(response.data.foo).toBe('bar');
        done();
      }, 100);
    });
  });

  test('should override default transform', () => {
    const data = {
      foo: 'bar'
    };

    axios.post('/foo', data, {
      transformRequest: data => data
    });

    getAjaxRequest().then(request => {
      expect(request.params).toEqual({
        foo: 'bar'
      });
    });
  });

  test('should allow an Array of transformers', () => {
    const data = {
      foo: 'bar'
    };

    axios.post('/foo', data, {
      transformRequest: (axios.defaults.transformRequest as AxiosTransformer[]).concat(data => {
        return data.replace('bar', 'baz');
      })
    });

    getAjaxRequest().then(request => {
      expect(request.params).toBe('{"foo":"baz"}');
    });
  });

  test('should allow mutating headers', () => {
    const token = Math.floor(Math.random() * Math.pow(2, 64)).toString(36);

    axios('/foo', {
      transformRequest: (data, headers) => {
        headers['X-Authorization'] = token;
        return data;
      }
    });

    getAjaxRequest().then(request => {
      expect(request.requestHeaders['X-Authorization']).toBe(token);
    });
  });
});
