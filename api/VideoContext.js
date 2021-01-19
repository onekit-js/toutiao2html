export default class VideoContext {

  constructor(videoManager) {
    this.videoManager = videoManager
  }

  play() {
    this.videoManager.play()
  }

}
