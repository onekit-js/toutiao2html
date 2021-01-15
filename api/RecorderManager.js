import TheKit from '../js/TheKit'
export default class RecorderManager {

  constructor() {
    this.recorder = undefined
    this.callback = undefined
  }


  start(tt_options) {
    const tt_duration = tt_options.duration || 60000
    const tt_sampleRate = tt_options.sampleRate || 8000
    // const tt_numberOfChannels = tt_options.numberOfChannels || 1
    // const tt_encodeBitRate = tt_options.encodeBitRate || 48000
    // const tt_frameSize = tt_options.frameSize || 8000
    let audioBitsPersecond
    switch (tt_sampleRate) {
      case 8000:
        audioBitsPersecond = TheKit.integer(16000, 48000)
        break;
      case 11025:
        audioBitsPersecond = TheKit.integer(16000, 48000)
        break;
      case 12000:
        audioBitsPersecond = TheKit.integer(24000, 64000)
        break;
      case 16000:
        audioBitsPersecond = TheKit.integer(24000, 96000)
        break;
      case 22050:
        audioBitsPersecond = TheKit.integer(32000, 128000)
        break;
      case 24000:
        audioBitsPersecond = TheKit.integer(32000, 128000)
        break;
      case 32000:
        audioBitsPersecond = TheKit.integer(48000, 192000)
        break;
      case 44100:
        audioBitsPersecond = TheKit.integer(64000, 320000)
        break;
      case 44100:
        audioBitsPersecond = TheKit.integer(64000, 320000)
        break;
      default:
        break;
    }
    const options = {
      audioBitsPersecond,
    }
    if (navigator.mediaDevices.getUserMedia) {
      const constraints = {
        audio: true
      }
      navigator.mediaDevices.getUserMedia(constraints).then(
        stream => {
          this.recorder = new MediaRecorder(stream, options)
          this.recorder.start()

          setTimeout(() => {
            this.stop()
            this.onStop(this.callback)
          }, tt_duration)
        },
        () => {
          console.warn('MediaRecorder: Authorization failure')
        }
      )
    } else {
      console.warn('Your browser version is too low')
    }
  }

  pause() {
    if (this.recorder && this.recorder.state !== 'inactive') {
      this.recorder.pause()
    }
  }

  resume() {
    if (this.recorder && this.recorder.state !== 'inactive') {
      this.recorder.resume()
    }
  }

  stop() {
    if (this.recorder && this.recorder.state !== 'inactive') {
      this.recorder.stop()
    }
  }

  onStart(callback) {
    if (this.recorder) {
      this.recorder.onstart = callback
    }
  }
  onPause(callback) {
    if (this.recorder && this.recorder.state !== 'inactive') {
      this.recorder.onpause = callback
    }
  }

  onResume(callback) {
    if (this.recorder && this.recorder.state !== 'inactive') {
      this.recorder.onresume = callback
    }
  }

  onStop(callback) {
    this.callback = callback
    if (this.recorder) {
      this.recorder.onstop = callback
    }
  }

  onFrameRecorded(callback) {
    if (this.recorder && this.recorder.state !== 'inactive') {
      this.recorder.onFrameRecorded = callback
    }
  }

  onError(callback) {
    this.recorder.onerror = callback
  }
}