import axios from '../../src';

axios({
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
});

axios({
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
});

const date = new Date();

axios({
  url: '/base/get',
  params: {
    date
  }
});

axios({
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
});

axios({
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
});

axios({
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
});

axios({
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
});

axios({
  method: 'POST',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res);
});

axios({
  method: 'POST',
  url: '/base/post',
  data: {
    a: 3,
    b: 4
  },
  responseType: 'json'
}).then(res => {
  console.log(res);
});

axios({
  method: 'POST',
  url: '/base/post',
  headers: {
    'content-type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
  },
  data: {
    a: 1,
    b: 2
  }
});

const paramsString = 'q=URLUtils.searchParams&topic=api';
const searchParams = new URLSearchParams(paramsString);

axios({
  method: 'POST',
  url: '/base/post',
  data: searchParams
});

axios({
  method: 'POST',
  url: '/base/buffer',
  data: new Int32Array([21, 31])
});
