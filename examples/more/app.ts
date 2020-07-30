import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import qs from 'qs';
import axios from '../../src';

document.cookie = 'a=b';

axios.get('/more/get').then(console.log);

axios
  .post(
    'http://127.0.0.1:8088/more/server2',
    {},
    {
      withCredentials: true
    }
  )
  .then(console.log);

const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
});

instance.get('/more/get').then(console.log);

const progressInstance = axios.create();

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total;
}

function loadProgressBar() {
  const setupStartProgress = () => {
    progressInstance.interceptors.request.use(config => {
      NProgress.start();
      return config;
    });
  };

  const setupUpdateProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e);
      NProgress.set(calculatePercentage(e.loaded, e.total));
    };
    progressInstance.defaults.onDownloadProgress = update;
    progressInstance.defaults.onUploadProgress = update;
  };

  const setupStopProgress = () => {
    progressInstance.interceptors.response.use(
      response => {
        NProgress.done();
        return response;
      },
      error => {
        NProgress.done();
        return Promise.reject(error);
      }
    );
  };

  setupStartProgress();
  setupUpdateProgress();
  setupStopProgress();
}

loadProgressBar();

const downloadEl = document.getElementById('download');

downloadEl!.addEventListener('click', () => {
  progressInstance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg');
});

const uploadEl = document.getElementById('upload');

uploadEl!.addEventListener('click', () => {
  const data = new FormData();
  const fileEl = document.getElementById('file') as HTMLInputElement;
  if (fileEl.files) {
    data.append('file', fileEl.files[0]);
    progressInstance.post('/more/upload', data);
  }
});

axios
  .post(
    '/more/post',
    { a: 1 },
    {
      auth: {
        username: 'Zi Ye',
        password: '123456789'
      }
    }
  )
  .then(console.log);

axios
  .get('/more/304')
  .then(console.log)
  .catch(err => console.error(err.message));

axios
  .get('/more/304', {
    validateStatus(status) {
      return status >= 200 && status < 400;
    }
  })
  .then(console.log)
  .catch(err => console.error(err.message));

axios
  .get('/more/get', {
    params: new URLSearchParams('a=b&c=d')
  })
  .then(console.log);

axios
  .get('/more/get', {
    params: {
      a: 1,
      b: 2,
      c: ['a', 'b', 'c']
    }
  })
  .then(console.log);

const instance1 = axios.create({
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' });
  }
});

instance1
  .get('/more/get', {
    params: {
      a: 1,
      b: 2,
      c: ['a', 'b', 'c']
    }
  })
  .then(console.log);
