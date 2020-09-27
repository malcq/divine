import axios from 'axios';
import config from '../config';
import { headers, getСookie } from './apiConfig';


axios.defaults.baseURL = config.url;

axios.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${getСookie(config.accessToken)}`;
  return request;
});

axios.interceptors.response.use((response) => response,
  async (err) => {
    if (err.response.status === 418) {
      // console.log('НЕТ ДОСТУПА!!!');
      window.location.replace('/home');
    }
    if (err.response.status === 401) {
      console.log('ПАРШИВЫЙ ТОКЕН!!!');
      const res = await refreshTokenRequest(err.config);
      return res;
    }
    console.log(err, 'intercepotrs err');
    throw err;
  });

// / 406 - нет пользователя в БД или сломанный токен
// / 418 - ошибка доступа

const refreshTokenRequest = async (request) => {
  const refreshToken = getСookie(config.refreshToken);
  try {
    const { data: res } = await axios({
      method: 'POST',
      data: { refreshToken },
      url: `${config.url}/api/auth/refresh-token`,
      headers: {
        ...headers(),
      },
    });

    document.cookie = `${res.cookie}; domain=${config.domain};`;
    const originalRequest = {
      ...request,
      data: {
        ...request.data,
        cookie: getСookie(config.accessToken)
      },
      headers: {
        ...request.headers,
        ...headers(),
      },
    };

    return axios(originalRequest);
  } catch (err) {
    console.log(err, 'refresh token err');
    throw err;
  }
};

export default axios;
