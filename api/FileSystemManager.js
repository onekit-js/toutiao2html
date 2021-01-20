import PROMISE from 'oneutil/PROMISE'
import TheKit from '../js/OneKit'

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
    }, success, fail, complete)
  }

  saveFileSync(tempFilePath, filePath) {
    try {
      const blob = this.fso.TEMP[tempFilePath]
      const filename = blob.type
      const savedFilePath = filePath || TheKit.createUserPath(filename)
      this.fso.FSO[savedFilePath] = blob
      this.fso.FSO[`${savedFilePath}_current_time`] = new Date().getTime()
      this.fso.FSO[`${savedFilePath}_size`] = blob.size
      return savedFilePath
    } catch (e) {
      throw new Error(e)
    }
  }

  saveFile(options) {
    const tempFilePath = options.tempFilePath
    const filePath = options.filePath
    const success = options.success
    const fail = options.fail
    const complete = options.complete
    options=null
    //
    PROMISE((SUCCESS) => {
      const blob = this.fso.TEMP[tempFilePath]
      const filename = blob.type
      const savedFilePath = filePath || TheKit.createUserPath(filename)
      this.fso.FSO[savedFilePath] = blob
      this.fso.FSO[`${savedFilePath}_current_time`] = new Date().getTime()
      this.fso.FSO[`${savedFilePath}_size`] = blob.size
      const res = {
        errMsg: 'saveFile: ok',
        savedFilePath,
      }
      SUCCESS(res)
    }, success, fail, complete)
  }

  getSavedFileList(options) {
    const success = options.success
    const fail = options.fail
    const complete = options.complete

    PROMISE(SUCCESS => {
      console.log(this.fso.FSO)
      const fileList = []
      const res = {
        errMsg: 'getSavedFile: ok',
        fileList,
      }

      SUCCESS(res)
    },success, fail, complete)
  }
}