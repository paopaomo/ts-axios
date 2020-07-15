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

interface ResponseData<T = any> {
  code: number;
  message: string;
  result: T
}

interface User {
  name: string;
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err));
}

async function test() {
  const user = await getUser<User>();
  if(user) {
    console.log(user.result.name);
  }
}

test();
