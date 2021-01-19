export default class InnerAudioContext {
  constructor(innerAudioContext) {
    this.innerAudioContext = innerAudioContext
    this.innerAudioContext.currentTime = 0
    this.innerAudioContext.autoplay = true
    this.innerAudioContext.loop = true
    this.innerAudioContext.muted = true

    this.stopFlag = false
    ///////////////////
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
      this.onPlay = () => false
    } catch {}
  }

  pause() {
    try {
      this.innerAudioContext.pause()
      this.onPause = () => false
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
    this._playListenner = function _eventListener() {
      const result = arguments[0].path[0]
      const res = {
        autoplay: result.autoplay,
        buffered: result.buffered.length,
        currentTime: result.currentTime,
        duration: result.duration,
        errMsg: 'getAudioState: ok',
        isInPkg: false,
        loop: result.loop,
        obeyMuteSwitch: result.muted,
        paused: arguments[0].type === 'paused',
        realativeSrc: result.currentSrc,
        src: result.currentSrc,
        volume: arguments[0].path.length
      }
      callback(res)
    }

    this.innerAudioContext.addEventListener('play', this._playListenner)
  }

  onPause(callback) {
    this._pauseListenner = function _eventListener() {
      const result = arguments[0].path[0]
      const res = {
        autoplay: result.autoplay,
        buffered: result.buffered.length,
        currentTime: result.currentTime,
        duration: result.duration,
        errMsg: 'getAudioState: ok',
        isInPkg: false,
        loop: result.loop,
        obeyMuteSwitch: result.muted,
        paused: arguments[0].type === 'paused',
        realativeSrc: result.currentSrc,
        src: result.currentSrc,
        volume: arguments[0].path.length
      }
      callback(res)
    }
    this.innerAudioContext.addEventListener('pause', this._pauseListenner)
  }

  onStop(callback) {
    this._stopListenner = function _eventListener() {
      const result = arguments[0].path[0]
      const res = {
        autoplay: result.autoplay,
        buffered: result.buffered.length,
        currentTime: result.currentTime,
        duration: result.duration,
        errMsg: 'getAudioState: ok',
        isInPkg: false,
        loop: result.loop,
        obeyMuteSwitch: result.muted,
        paused: arguments[0].type === 'paused',
        realativeSrc: result.currentSrc,
        src: result.currentSrc,
        volume: arguments[0].path.length
      }
      callback(res)
    }
    this.innerAudioContext.addEventListener('stop', this._stopListenner)
  }

  onEnded(callback) {
    this._endedListenner = function _eventListener() {
      const result = arguments[0].path[0]
      const res = {
        autoplay: result.autoplay,
        buffered: result.buffered.length,
        currentTime: result.currentTime,
        duration: result.duration,
        errMsg: 'getAudioState: ok',
        isInPkg: false,
        loop: result.loop,
        obeyMuteSwitch: result.muted,
        paused: arguments[0].type === 'paused',
        realativeSrc: result.currentSrc,
        src: result.currentSrc,
        volume: arguments[0].path.length
      }
      callback(res)
    }
    this.innerAudioContext.addEventListener('ended', this._endedListenner)
  }

  onTimeUpdate(callback) {
    this._timeupdateListenner = function _eventListener() {
      callback()
    }
    this.innerAudioContext.addEventListener('timeupdate', this._timeupdateListenner)
  }

  onError(callback) {
    this._errorListenner = function _eventListener() {
      callback()
    }
    this.innerAudioContext.addEventListener('error', this._errorListenner)
  }

  onWaiting(callback) {
    this._waitingListenner = function _eventListener() {
      callback()
    }
    this.innerAudioContext.addEventListener('waiting', this._waitingListenner)
  }

  onSeeking(callback) {
    this._seekingListenner = function _eventListener() {
      callback()
    }
    this.innerAudioContext.addEventListener('seeking', this._seekingListenner)
  }

  onSeeked(callback) {
    this._seekedListenner = function _eventListener() {
      callback()
    }
    this.innerAudioContext.addEventListener('seeked', this._seekedListenner)
  }

  offPlay() {
    this.innerAudioContext.removeEventListener('play', this._playListenner)
  }

  offPause() {
    this.innerAudioContext.removeEventListener('pause', this._pauseListenner)
  }

  offStop() {
    this.innerAudioContext.removeEventListener('stop', this._stopListenner)
  }

  offEnded() {
    this.innerAudioContext.removeEventListener('ended', this._endedListenner)
  }

  offTimeUpdate() {
    this.innerAudioContext.removeEventListener('timeupdate', this._timeupdateListenner)
  }

  offError() {
    this.innerAudioContext.removeEventListener('error', this._errorListenner)
  }

  offWaiting() {
    this.innerAudioContext.removeEventListener('waiting', this._waitingListenner)
  }

  offSeeking() {
    this.innerAudioContext.removeEventListener('seeking', this._seekingListenner)
  }

  offSeeked() {
    this.innerAudioContext.removeEventListener('seeked', this._seekedListenner)
  }
}