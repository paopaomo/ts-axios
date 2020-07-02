import axios from '../../src'

axios({
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
});
