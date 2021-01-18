export default class InnerAudioContext{
  constructor(innerAudioContext) {
    this.innerAudioContext = innerAudioContext
    this.innerAudioContext.currentTime = 0
    this.innerAudioContext.autoplay = true
    this.innerAudioContext.loop = true
    this.innerAudioContext.muted = true
  }

  set src(src) {
    this.innerAudioContext.src = src
  }

  set startTime(position) {
    this.innerAudioContext.currentTime = position
  }

  set autoplay(boolean) {
    this.innerAudioContext.autoplay = boolean
  }

  set loop(boolean) {
    this.innerAudioContext.loop = boolean
  }

  set obeyMuteSwitch(boolean) {
    this.innerAudioContext.muted =  boolean
  }

  play() {
    this.innerAudioContext.play()
  }

  pause() {
    this.innerAudioContext.pause()
  }

  stop() {
    this.innerAudioContext.pause()
    this.innerAudioContext.currentTime = 0
  }

  seek(position) {
    this.innerAudioContext.currentTime = position
  }
}
