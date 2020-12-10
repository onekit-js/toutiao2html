import axios from 'axios' 
export default class RequestTask {
  constructor(axios_instance) {
    this.axios_instance = axios_instance

  }
  abort() {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios.interceptors.request.use(
      config => {
        config.cancelToken = source.token;
        return config;
      },
      err => {
        return Promise.reject(err);
      }
    );
    this.axios_instance.interceptors.request.use(() => {
        source.cancel(); 
      }
    );
  }

  onHeadersReceived(callback) {
    this.onHeadersReceived = callback
    this.wx_request.interceptors.response.use(response => {
      const header = response.headers
      const wx_res = {
        header
      };
      this.onHeadersReceived(wx_res)
      return response;
    }, function(error) {
      return Promise.reject(error);
    });
  }

  offHeadersReceived() {
    this.onHeadersReceived = null
  }
}