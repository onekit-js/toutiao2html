import PATH from "oneutil/PATH"

export default class FileSystemManager {
  constructor(FSO_OBJ) {
    this.fso = FSO_OBJ
  }

  accessSync(path) {
    if(!path) return
    if(path.substr(0, 6) !== 'ttfile') throw new Error('Browser is not support read the user disk')
    if(Object.keys(this.fso.TEMP).indexOf(path) !== -1) {
      return true
    }else {
      throw new Error(`accessSync:fail no such file or directory, accessSync ${path}`)
    }
  }
}