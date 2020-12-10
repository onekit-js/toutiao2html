export default class UpdateManager {
  applyUpdate() {

  }
  onCheckForUpdate(callback) {
    const res = {
      hasUpdate: false
    }
    callback(res)
  }
  onUpdateFailed() {}
  onUpdateReady() {}
}