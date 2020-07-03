import { isDate, isObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3a/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2c/ig, ',')
    .replace(/%20/g, '+')
    .replace(/%5b/ig, '[')
    .replace(/%5d/ig, ']');
}

export function buildURL(url: string, params?: any): string {
  if(!params) {
    return url;
  }

  const parts: string[] = [];

  Object.keys(params).forEach(key => {
    const val = params[key];
    if(val === null || typeof val === 'undefined') {
      return;
    }
    let values = [];
    if(Array.isArray(val)) {
      values = val;
      key =  `${key}[]`;
    } else {
      values = [val];
    }
    values.forEach(item => {
      if(isDate(item)) {
        item = item.toISOString();
      } else if(isObject(item)) {
        item = JSON.stringify(item);
      }
      parts.push(`${encode(key)}=${encode(item)}`);
    })
  })

  const serializedParams = parts.join('&');

  if(serializedParams) {
    const markIndex = url.indexOf('#');
    if(markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    url += `${url.indexOf('?') === -1 ? '?' : '&'}${serializedParams}`;
  }

  return url;
}
