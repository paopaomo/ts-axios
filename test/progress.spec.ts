import axios from '../src';
import { getAjaxRequest } from './helper';

describe('progress', () => {
  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  test('should add a download progress handler', () => {
    const progressSpy = jest.fn();

    axios('/foo', { onDownloadProgress: progressSpy });

    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: '{"foo":"bar}'
      });
      expect(progressSpy).toHaveBeenCalled();
    });
  });

  test('should add a upload progress handler', () => {
    const uploadSpy = jest.fn();

    axios('/foo', { onUploadProgress: uploadSpy });

    return getAjaxRequest().then(request => {
      // expect uploadSpy toHaveBeenCalled
    });
  });
});
