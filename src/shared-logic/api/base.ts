import {default as axios, AxiosInstance} from 'axios';
import log from '../../../logger';
export let secureInstance: AxiosInstance;

export function setSecureAxiosInstance(baseURL: string) {
  if (!baseURL) {
    throw new Error(
      'Unable to resolve Base URL. Ensure that the environment variable is properly set up',
    );
  }
  const timeout = 5000;
  secureInstance = axios.create({
    timeout,
    baseURL,
    // by default axios will throw exception when: !(200 <= statusCode < 300)
    // we config for axios should not throw exception in any status, so that we no-need to try catch on `actions.tsx` file
    validateStatus: function (_status) {
      return true;
    },
  });
// Log request
secureInstance.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase() || 'GET';
  const url = `${config.baseURL}${config.url}`;
  const headers = config.headers || {};
  const data = config.data;

  const curlParts = [
    `curl -X ${method}`,
    `'${url}'`,
    ...Object.entries(headers).map(([k, v]) => `-H '${k}: ${v}'`),
    data
      ? `--data '${typeof data === 'string' ? data : JSON.stringify(data)}'`
      : '',
  ];

  const curl = curlParts.join(' \\\n  ');
  console.log('[cURL]\n', curl); // hoặc log.info nếu dùng react-native-logs

  return config;
});

  secureInstance.interceptors.response.use(
    function (response) {
      log.debug(`[RESPONSE] ${response.status} ${response.config.url}`);
      log.debug(`Data: ${JSON.stringify(response.data)}`);
      if (response.status !== 200) {
        if (response.status === 401) {
          if (window) {
            window.localStorage?.removeItem('session');
            window.localStorage?.removeItem('companyID');
            window.location.href = '/';
            return Promise.reject(response);
          }
        }
        return Promise.reject(response.data);
      } else if (response.status === 200 && response.data.errorCode === 1) {
        return Promise.reject(response.data);
      }
      return response;
    },
    function (error) {
      log.error(`[ERROR] ${error}`);
      return Promise.reject(error);
    },
  );
}

export function setToken(session: string): void {
    secureInstance.defaults.headers.common['Content-Type'] = 'application/json';
  secureInstance.defaults.headers.common['X-API-KEY'] = session;
}
