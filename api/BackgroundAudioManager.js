export default class BackgroundAudioManager {
  constructor(bgAudiocontext) {
    this.bgAudiocontext = bgAudiocontext
  }
  play(){
    this.bgAudiocontext.src = this.src
    console.log(this.src)
    // console.log(this.bgAudiocontext)
    this.bgAudiocontext.play()
  }

  pause() {}

  stop() {}

  seek() {}

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