export default class InnerAudioContext {
  constructor(innerAudioContext) {
    this.innerAudioContext = innerAudioContext
    this.innerAudioContext.currentTime = 0
    this.innerAudioContext.autoplay = true
    this.innerAudioContext.loop = true
    this.innerAudioContext.muted = true

    this.stopFlag = false
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
      this.stopFlag = true
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

  onCanplay(callback) {
    this.innerAudioContext.addEventListener('canplay', () => {
      callback()
    })
  }
  onPlay(callback) {
    this.innerAudioContext.addEventListener('play', e => {
      const result = e.path[0]
      const res = {
        autoplay: result.autoplay,
        buffered: result.buffered.length,
        currentTime: result.currentTime,
        duration: result.duration,
        errMsg: 'getAudioState: ok',
        isInPkg: false,
        loop: result.loop,
        obeyMuteSwitch: result.muted,
        paused: e.type === 'paused',
        realativeSrc: result.currentSrc,
        src:result.currentSrc,
        volume: e.path.length
      }
      callback(res)
    })
  }

  onPause(callback) {
    this.innerAudioContext.addEventListener('pause', e => {
      const result = e.path[0]
      const res = {
        autoplay: result.autoplay,
        buffered: result.buffered.length,
        currentTime: result.currentTime,
        duration: result.duration,
        errMsg: 'getAudioState: ok',
        isInPkg: false,
        loop: result.loop,
        obeyMuteSwitch: result.muted,
        paused: e.type === 'paused',
        realativeSrc: result.currentSrc,
        src:result.currentSrc,
        volume: e.path.length
      }
      callback(res)
    })
  }

  onStop(callback) {
    this.innerAudioContext.addEventListener('pause', e => {
      const result = e.path[0]
      const res = {
        autoplay: result.autoplay,
        buffered: result.buffered.length,
        currentTime: result.currentTime,
        duration: result.duration,
        errMsg: 'getAudioState: ok',
        isInPkg: false,
        loop: result.loop,
        obeyMuteSwitch: result.muted,
        paused: e.type === 'paused',
        realativeSrc: result.currentSrc,
        src:result.currentSrc,
        volume: e.path.length
      }
      callback(res)
      this.stopFlag = false
    })
  }

  onEnded(callback) {
    this.innerAudioContext.addEventListener('ended', e => {
      const result = e.path[0]
      const res = {
        autoplay: result.autoplay,
        buffered: result.buffered.length,
        currentTime: result.currentTime,
        duration: result.duration,
        errMsg: 'getAudioState: ok',
        isInPkg: false,
        loop: result.loop,
        obeyMuteSwitch: result.muted,
        paused: e.type === 'paused',
        realativeSrc: result.currentSrc,
        src:result.currentSrc,
        volume: e.path.length
      }
      callback(res)
    })
  }
}