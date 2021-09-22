export class FramesPerSecond {
  private framerate: number
  private currentTime: number

  constructor(fps = 10) {
    this.framerate = 1000 / fps
    this.currentTime = Date.now()
  }

  get check(): boolean {
    const now: number = Date.now()
    const elapsed: number = now - this.currentTime
    if (elapsed > this.framerate) {
      this.currentTime = now - (elapsed % this.framerate)
      return true
    }
    return false
  }
}
