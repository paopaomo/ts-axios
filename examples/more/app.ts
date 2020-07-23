import NProgress from 'nprogress';
import axios from '../../src';
import 'nprogress/nprogress.css';

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
