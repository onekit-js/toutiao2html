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
      const saveFile = {
        currentTime: this.fso.FSO[`${savedFilePath}_current_time`],
        filePath: savedFilePath,
        size: this.fso.FSO[`${savedFilePath}_size`]
      }
      this.fso.FSO_LIST_.push(saveFile)
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
    options = null

    PROMISE((SUCCESS) => {
      const blob = this.fso.TEMP[tempFilePath]
      const filename = blob.type
      const savedFilePath = filePath || TheKit.createUserPath(filename)
      this.fso.FSO[savedFilePath] = blob
      this.fso.FSO[`${savedFilePath}_current_time`] = new Date().getTime()
      this.fso.FSO[`${savedFilePath}_size`] = blob.size
      const saveFile = {
        currentTime: this.fso.FSO[`${savedFilePath}_current_time`],
        filePath: savedFilePath,
        size: this.fso.FSO[`${savedFilePath}_size`]
      }
      this.fso.FSO_LIST_.push(saveFile)
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
      const fileList = this.fso.FSO_LIST_
      const res = {
        errMsg: 'getSavedFile: ok',
        fileList,
      }

      SUCCESS(res)
    }, success, fail, complete)
  }

  removeSavedFile(options) {
    const filePath = options.filePath
    const success = options.success
    const complete = options.complete
    const fail = options.fail
    options = null
    PROMISE(SUCCESS => {
      if (!filePath) return
      const index = this.fso.FSO_LIST_.findIndex(item => item.filePath === filePath)
      this.fso.FSO_LIST_.splice(index - 1, 1)
      const res = {
        errMsg: 'removeSavedFile: ok'
      }

      SUCCESS(res)
    }, success, fail, complete)
  }

  copyFileSync(srcPath, destPath) {
    try {
      if (destPath.substr(0, 13) === 'ttfile://user') {
        const blob = this.fso.FSO[srcPath]
        const currentTime = new Date.getTime()
        this.fso.FSO[destPath] = blob
        const saveFile = {
          currentTime: currentTime,
          filePath: destPath,
          size: blob.size
        }
        this.fso.FSO_LIST_.push(saveFile)
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  copyFile(options) {
    const srcPath = options.srcPath
    const destPath = options.destPath
    const success = options.success
    const fail = options.fail
    const complete = options.complete

    PROMISE(SUCCESS => {
      if (destPath.substr(0, 13) !== 'ttfile://user') throw new Error('fail no such file or directory')

      const blob = this.fso.FSO[srcPath]
      const currentTime = new Date.getTime()
      this.fso.FSO[destPath] = blob
      const saveFile = {
        currentTime: currentTime,
        filePath: destPath,
        size: blob.size
      }
      this.fso.FSO_LIST_.push(saveFile)
      const res = {
        errMsg: 'copyFile: ok'
      }
      SUCCESS(res)

    }, success, fail, complete)
  }

  getFileInfo(options) {
    const filePath = options.filePath
    const success = options.success
    const fail = options.fail
    const complete = options.complete

    PROMISE(SUCCESS => {
      if (!filePath) return
      if (filePath.substr(0, 13) === 'ttfile://user' || filePath.substr(0, 13) === 'ttfile://temp') {
        if(!this.fso.FSO[filePath]) return false
        const blob = this.fso.FSO[filePath]
        const digest = TheKit.tempFilepath2digest(filePath)
        const res = {
          digest,
          errMsg: 'getFileInfo: ok',
          size: blob.size
        }

        SUCCESS(res)
      } else {
        throw new Error('fail no such file or directory')
      }

    }, success, fail, complete)
  }

  mkdirSync(dirPath) {
    try {
      if(dirPath.substr(0, 13) !== 'ttfile://user') throw Error
    }catch (e) {
      throw Error(`mkdirSync:fail permission denied, mkdirSync ${dirPath} at Object.eval [as mkdirSync]`)
    }
    try{
      if(this.fso.FSO[dirPath]) throw new Error  
      this.fso.FSO[dirPath] = dirPath
    }catch (e) {
      throw new Error(`mkdirSync:fail file already exists, mkdirSync ${dirPath} at Object.eval [as mkdirSync]`)
    }
  }

  mkdir(options) {
    const dirPath = options.dirPath
    const success = options.success
    const fail = options.fail
    const complete = options.complete

    PROMISE(SUCCESS => {
      if(dirPath.substr(0, 13) !== 'ttfile://user') throw Error(`mkdirSync:fail permission denied, mkdirSync ${dirPath} at Object.eval [as mkdirSync]`)
      if(this.fso.FSO[dirPath]) throw Error(`mkdirSync:fail file already exists, mkdirSync ${dirPath} at Object.eval [as mkdirSync]`)
      this.fso.FSO[dirPath] = dirPath
      const res = {
        errMsg: 'mkdir: ok'
      }
      SUCCESS(res)
    },success, fail, complete)
  }

  readdirSync(dirPath) {
    try {
      if(dirPath.substr(0, 13) !== 'ttfile://user') throw Error
      let list_index = [],
      DIR_ARRAY = []
      this.fso.FSO_LIST_.forEach((item, index) => {
        if(item.filePath.indexOf(dirPath) !== -1) {
          list_index.push(index)
        }
      })
      for(const i of list_index) {
        DIR_ARRAY.push(this.fso.FSO_LIST_[i])
      }
      return DIR_ARRAY
    }catch (e) {
      throw Error(`readdirSync:fail permission denied, readdirSync ${dirPath} at Object.eval [as mkdirSync]`)
    }
  }

  readdir(options) {
    const dirPath = options.dirPath
    const success = options.success
    const fail = options.fail
    const complete = options.complete

    PROMISE(SUCCESS => {
      if(dirPath.substr(0, 13) !== 'ttfile://user') throw Error(`readdirSync:fail permission denied, readdirSync ${dirPath} at Object.eval [as mkdirSync]`)
      let list_index = [],
      DIR_ARRAY = []
      this.fso.FSO_LIST_.forEach((item, index) => {
        if(item.filePath.indexOf(dirPath) !== -1) {
          list_index.push(index)
        }
      })
      for(const i of list_index) {
        DIR_ARRAY.push(this.fso.FSO_LIST_[i])
      }
      const res = {
        errMsg: 'readdir: ok',
        files: DIR_ARRAY
      }
      SUCCESS(res)
    },success, fail, complete)
  }

  readFileSync(filePath, encoding) {
    encoding = null
    if(filePath.substr(0, 13) !== 'ttfile://user' && filePath.substr(0, 13) !== 'ttfile://temp') throw Error(`readdirSync:fail permission denied, readdirSync ${dirPath} at Object.eval [as mkdirSync]`)
    try{
      let blob
      if(filePath.substr(0, 13) === 'ttfile://user') blob = this.fso.FSO[filePath]
      if(filePath.substr(0, 13) === 'ttfile://temp') blob = this.fso.TEMP[filePath]
      else throw Error (`readdirSync:fail permission denied, readdirSync ${dirPath} at Object.eval [as mkdirSync]`)
      return blob
    }catch (e) {
      throw (e)
    }
  }
}