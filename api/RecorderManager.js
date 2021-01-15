export default class RecorderManager {

  constructor() {
    this.state = null
    if (navigator.mediaDevices.getUserMedia) {
      const constraints = {
        audio: true
      }
      navigator.mediaDevices.getUserMedia(constraints).then(
        stream => {
          const mediaRecorder = new MediaRecorder(stream)
          this._start(mediaRecorder)
          // this.start(mediaRecorder)
          // if (this.state === 'recording') {
          //   mediaRecorder.start()
          //   console.log(mediaRecorder.state)
          // } else if (this.state === 'stop') {
          //   mediaRecorder.stop()
          //   console.log(mediaRecorder.state)
          // }
        },
        () => {
          console.error("授权失败！");
        }
      );
    } else {
      console.error("Your browser version is too low");
    }
  }

  _start(mediaRecorder) {
    console.log(mediaRecorder)
  }

  start(tt_options) {
    const tt_duration = tt_options.duration || 60000
    const tt_sampleRate = tt_options.sampleRate || 8000
    const tt_numberOfChannels = tt_options.numberOfChannels || 1
    const tt_encodeBitRate = tt_options.encodeBitRate || 48000
    const tt_frameSize = tt_options.frameSize || 8000

    const options = {
      tt_duration,
      tt_sampleRate,
      tt_numberOfChannels,
      tt_encodeBitRate,
      tt_frameSize,
    }
    // this.state = 'recording'
    // this.mediaRecorder.start()
    console.log(mediaRecorder)
  }

  pause() {

  }

  resume() {

  }

  stop() {
    this.state = 'stop'
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