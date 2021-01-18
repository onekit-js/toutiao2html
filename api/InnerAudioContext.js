export default class InnerAudioContext {
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
    this.innerAudioContext.muted = boolean
  }

  play() {
    try {
      this.innerAudioContext.play()
    } catch {}
  }

  pause() {
    try {
      this.innerAudioContext.pause()
    } catch {}
  }

  stop() {
    try {
      this.innerAudioContext.pause()
      this.innerAudioContext.currentTime = 0
    } catch {}
  }

  seek(position) {
    try {
      this.innerAudioContext.currentTime = position
    } catch {}
  }

  destroy() {
    try {
      this.innerAudioContext.pause()
      this.innerAudioContext = null
    } catch {}
  }
}