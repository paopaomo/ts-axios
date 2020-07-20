import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types';
import xhr from './xhr';
import { buildURL } from '../helpers/url';
import { flattenHeaders } from '../helpers/headers';
import { transform } from './transform';

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config);

  throwIfCancellationRequested(config);

  return xhr(config).then(transformResponseData);
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  config.data = transform(config.data, config.headers, config.transformRequest);
  config.headers = flattenHeaders(config.headers, config.method!);
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url!, params);
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse);
  return res;
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

export default dispatchRequest;
