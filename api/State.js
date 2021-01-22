export default class State {
 constructor(obj) {
   this.obj = obj
  }

  get mode() {
    return this.obj.mode
  }

  get size() {
    return this.obj.size
  }

  get lastAccessedTime() {
    return this.obj.lastAccessedTime
  }

  get lastModifiedTime() {
    return this.obj.lastModifiedTime
  }

  isDirectory() {

  }

  isFile() {

  }
}