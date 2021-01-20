export default class FileSystemManager {
  constructor(FSO_OBJ) {
    this.fso = FSO_OBJ
  }

  accessSync(path) {
    if(!path) return
    if(path.substr(0, 6) === 'ttfile://') {
      console.log(this.fso)
    }
  }
}