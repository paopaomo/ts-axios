import axios from '../../src';

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'Hello'
  }
});

axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'Hello'
  }
});

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'Hello'
  }
});

axios.get('/extend/get');
axios.delete('/extend/delete');
axios.head('/extend/head');
axios.options('/extend/options');

axios.post('/extend/post', { msg: 'post' });
axios.put('/extend/put', { msg: 'put' });
axios.patch('/extend/patch', { msg: 'patch' });
