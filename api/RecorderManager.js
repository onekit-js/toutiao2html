export default class RecorderManager {

  constructor() {
    this.recorder = null
  }


  start(tt_options) {
    //   const tt_duration = tt_options.duration || 60000
    //   const tt_sampleRate = tt_options.sampleRate || 8000
    //   const tt_numberOfChannels = tt_options.numberOfChannels || 1
    //   const tt_encodeBitRate = tt_options.encodeBitRate || 48000
    //   const tt_frameSize = tt_options.frameSize || 8000

    //   const options = {
    //     tt_duration,
    //     tt_sampleRate,
    //     tt_numberOfChannels,
    //     tt_encodeBitRate,
    //     tt_frameSize,
    //   }

    if (navigator.mediaDevices.getUserMedia) {
      const constraints = {
        audio: true
      }
      navigator.mediaDevices.getUserMedia(constraints).then(
        stream => {
          this.recorder = new MediaRecorder(stream)
          this.recorder.start()
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

  }

  resume() {

  }

  stop() {
    this.recorder.stop()
  }

  onStart() {

  }

  onPause() {

  }

  onResume() {

  }

  onStop() {

  }

  onFrameRecorded() {

  }

  onError() {

  }
}