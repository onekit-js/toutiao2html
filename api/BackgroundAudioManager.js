export default class BackgroundAudioManager {
  constructor(bgAudiocontext) {
    this.bgAudiocontext = bgAudiocontext
    this.stopFlag = false
    this.updateFlag = true
  }

  set src(src) {
    this.bgAudiocontext.src = src
  } 

  play() {
    this.bgAudiocontext.play()
  }

  pause() {
    this.bgAudiocontext.pause()
  }

  stop() {
    this.stopFlag = true
    this.pause()
    this.bgAudiocontext.currentTime = 0
  }

  seek(options) {
    this.bgAudiocontext.currentTime = options
  }

  onCanplay(callback) {
    this.bgAudiocontext.onloadedmetadata = res => {
      const src = res.path.map(item => item.currentSrc)
      const result = {
        src,
      }
      callback(result)
    }
  }

  onPlay(callback) {
    this.bgAudiocontext.addEventListener('play', e => {
      const res = {
        src: e.path.map(src => src.currentSrc)
      }
      callback(res)
    })
  }

  onPause(callback) {
    this.bgAudiocontext.addEventListener('pause', e => {
      const res = {
        src: e.path.map(src => src.currentSrc)
      }
      callback(res)
    })
  }

  onStop(callback) {
    this.bgAudiocontext.addEventListener('pause', e => {
      if(this.stopFlag) {
        const res = {
          src: e.path.map(src => src.currentSrc)
        }
        callback(res)
        this.stopFlag = false
      }
    })
  }

  onEnded(callback) {
    this.bgAudiocontext.addEventListener('ended', callback, false)
  }

  onTimeUpdate(callback) {
    this.bgAudiocontext.addEventListener('timeupdate', () => {
      callback()
    })
  }

  offTimeUpdate() {
    console.warn('In fact, toutiao is not support offTimeUpdate')
  }

  onError(callback) {
    this.bgAudiocontext.addEventListener('error', () => {
      callback()
    })
  }

  onWaiting(callback) {
    this.bgAudiocontext.addEventListener('waiting', () => {
      callback()
    })
  }

  onSeeked(callback) {
    this.bgAudiocontext.addEventListener('seeked', () => {
      callback()
    })
  }

  onNext() {
    this.bgAudiocontext.addEventListener('seeked', () => {
      callback()
    })
  }

  onPrev() {
    this.bgAudiocontext.addEventListener('seeked', () => {
      callback()
    })
  }

  
}