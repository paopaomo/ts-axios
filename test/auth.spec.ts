import axios from '../src';
import { getAjaxRequest } from './helper';

describe('auth', () => {
  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  test('should accept HTTP basic auth with username/password', () => {
    axios('/foo', {
      auth: {
        username: 'Aladdin',
        password: 'open sesame'
      }
    });

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders.Authorization).toBe('Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==');
    });
  });
});
