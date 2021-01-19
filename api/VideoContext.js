export default class VideoContext {

  constructor(videoManager) {
    this.videoManager = videoManager
  }

  play() {
    this.videoManager.play()
  }

  pause() {
    this.videoManager.pause()
  }

  stop() {
    this.videoManager.pause()
    this.videoManager.currentTime = 0
  }
  seek(position) {
    this.videoManager.currentTime = position
  }
}
