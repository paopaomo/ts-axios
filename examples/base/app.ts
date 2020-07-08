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
});

axios({
  method: 'POST',
  url: '/base/buffer',
  data: new Int32Array([21, 31])
})
