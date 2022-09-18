import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  timeout: 500000,
  headers: {
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/vnd.github+json',
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return {
    ...config,
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
    },
  };
});

// console.log(process.env.API_BASE_URL);
const responseBody = (response:any) => response.data;

const requests = {
  get: (url:string, body?:any) => instance.get(url, body).then(responseBody),

  post: (url:string, body:any | null, headers :any) =>
    instance.post(url, body, headers).then(responseBody),

  put: (url:string, body:any) => instance.put(url, body).then(responseBody),
};

export default requests;
