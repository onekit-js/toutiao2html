import PROMISE from 'oneutil/PROMISE'

export default class FileSystemManager {
  constructor(FSO_OBJ) {
    this.fso = FSO_OBJ
  }

  accessSync(path) {
    if (!path) throw new Error('path is invalid')
    if (path.substr(0, 6) !== 'ttfile') throw new Error('Browser is not support read the user disk')
    if (Object.keys(this.fso.TEMP).indexOf(path) !== -1) {
      return true
    } else {
      throw new Error(`accessSync:fail no such file or directory, accessSync ${path}`)
    }
  }

  access(options) {
    const path = options.path
    const success = options.success
    const fail = options.fail
    const complete = options.complete
    options = null

    PROMISE(SUCCESS => {
      if (!path) throw new Error('path is invalid')
      if (path.substr(0, 6) !== 'ttfile') throw new Error('Browser is not support read the user disk')
      if (Object.keys(this.fso.TEMP).indexOf(path) !== -1) {
        const res = {
          errMsg: 'access: ok'
        }
        SUCCESS(res)
      } else {
        const res = {
          errMsg: `access:fail no such file or directory, access ${path}`
        }
        throw Error(res)
      }
    }, success, complete, fail)
  }

  saveFileSync(tempFilePath, filePath) {
    try {
      const blob = this.fn_global().TEMP[tempFilePath]
      const filename = blob.type
      const savedFilePath = filePath || TheKit.createTempPath(filename)
      this.fn_global().FSO[savedFilePath] = blob
    } catch (e) {
      throw new Error(e)
    }
  }
}