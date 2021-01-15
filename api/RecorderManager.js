export default class RecorderManager {

  constructor() {
    this.recorder = undefined
    this.callback = undefined
  }


  start(tt_options) {
      const tt_duration = tt_options.duration || 60000
      const tt_sampleRate = tt_options.sampleRate || 8000
      const tt_numberOfChannels = tt_options.numberOfChannels || 1
      const tt_encodeBitRate = tt_options.encodeBitRate || 48000
      const tt_frameSize = tt_options.frameSize || 8000

      const options = {
        tt_sampleRate,
        tt_numberOfChannels,
        tt_encodeBitRate,
        tt_frameSize,
      }
    if (navigator.mediaDevices.getUserMedia) {
      const constraints = {
        audio: true
      }
      navigator.mediaDevices.getUserMedia(constraints).then(
        stream => {
          this.recorder = new MediaRecorder(stream)
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
    if(this.recorder) {
      this.recorder.pause()
    }
  }

  resume() {
    if(this.recorder) {
      this.recorder.resume()
    }
  }

  stop() {
    if (this.recorder) {
      this.recorder.stop()
    }
  }

  onStart(callback) {
   if(this.recorder) {
    this.recorder.onstart = callback
   }
  }
  onPause(callback) {
    if(this.recorder) {
      this.recorder.onpause = callback
    }
  }

  onResume(callback) {
    if(this.recorder) {
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
   if(this.recorder) {
    this.recorder.onFrameRecorded = callback
   }
  }

  onError(callback) {
    this.recorder.onerror = callback
  }
}