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

  requestFullScreen() {
    if (this.videoManager.requestFullscreen) {
      this.videoManager.requestFullscreen()
    } else if (this.videoManager.mozRequestFullScreen) {
      this.videoManager.mozRequestFullScreen()
    } else if (this.videoManager.webkitRequestFullScreen) {
      this.videoManager.webkitRequestFullScreen()
    }
  }

  exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    }
  }
}