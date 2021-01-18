export default class InnerAudioContext{
  constructor(innerAudioContext) {
    this.innerAudioContext = innerAudioContext
  }

  set src(src) {
    this.innerAudioContext.src = src
  }

  play() {
    this.innerAudioContext.play()
  }

}
