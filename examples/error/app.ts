import axios, { AxiosError } from '../../src';

axios({
  url: '/error/get1'
}).then(res => {
  console.log(res);
}).catch(e => {
  console.log(e);
});

axios({
  url: '/error/get'
}).then(res => {
  console.log(res);
}).catch(e => {
  console.log(e);
});

setTimeout(() => {
  axios({
    url: '/error/get'
  }).then(res => {
    console.log(res);
  }).catch(e => {
    console.log(e);
  });
}, 5000);

axios({
  url: '/error/timeout',
  timeout: 2000
}).then(res => {
  console.log(res);
}).catch((e: AxiosError) => {
  console.log(e.message);
  console.log(e.config);
  console.log(e.code);
  console.log(e.request);
  console.log(e.isAxiosError);
});
