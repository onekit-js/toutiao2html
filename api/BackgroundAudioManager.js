export default class BackgroundAudioManager {
  constructor(bgAudiocontext) {
    this.bgAudiocontext = bgAudiocontext
  }
  play(){
    this.bgAudiocontext.src = this.src
    this.bgAudiocontext.play()
  }

  pause() {}

  stop() {}

  seek(options) {
    this.bgAudiocontext.currentTime = options
  }

  onCanplay() {}

  onPlay() {}

  onPause() {}

  onStop() {}

  onEnded() {}

  onTimeUpdate() {}

  offTimeUpdate() {}

  onError() {}

  onWaiting() {}

  onSeeked() {}

  onNext() {}

  onPrev() {}
}