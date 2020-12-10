import axios from 'axios'

export default class UploadTask {

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
    this.axios.interceptors.response.use(response => {
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

  onProgressUpdate(callback) {

    this.onProgressUpdate = callback

    this.axios_instance.defaults['onUploadProgress'] = progressEvent => {
      const res = {
        progress: (progressEvent.loaded / progressEvent.total * 100 | 0),
        totalBytesExpectedToSend: progressEvent.total,
        totalBytesSent: progressEvent.loaded,
        cookies: []
      }
      this.onProgressUpdate(res)
    }

  }

  offProgressUpdate() {
    this.onProgressUpdate = null
    this.axios_instance.defaults['onUploadProgress'] = {}
  }
}