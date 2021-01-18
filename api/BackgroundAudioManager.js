export default class BackgroundAudioManager {
  constructor(bgAudiocontext) {
    this.bgAudiocontext = bgAudiocontext
  }
  play() {
    this.bgAudiocontext.src = this.src
    this.bgAudiocontext.play()
  }

  pause() {}

  stop() {
    this.bgAudiocontext.currentTime = 0
    this.bgAudiocontext.pause()
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

  onPause() {}

  onStop() {}

  onEnded(callback) {
    this.bgAudiocontext.addEventListener('ended', callback, false)
  }

  onTimeUpdate() {}

  offTimeUpdate() {}

  onError() {}

  onWaiting() {}

  onSeeked() {}

  onNext() {}

  onPrev() {}
}