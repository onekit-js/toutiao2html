export default class RecorderManager {

  constructor() {

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

    if (navigator.mediaDevices.getUserMedia) {
      const constraints = {
        audio: true
      };
      navigator.mediaDevices.getUserMedia(constraints).then(
        stream => {
          console.log("授权成功！");
          const mediaRecorder = new MediaRecorder(stream)
          mediaRecorder.start()
          console.log('开始录音....', options)
          console.log(mediaRecorder)          
        },
        () => {
          console.error("授权失败！");
        }
      );
    } else {
      console.error("浏览器不支持 getUserMedia");
    }


  }

  pause() {

  }

  resume() {

  }

  stop() {

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