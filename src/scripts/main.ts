import 'styles/style.scss'
import { CustomEngine } from '@/components/CustomEngine'
import { FramesPerSecond } from '@/utils/animation/FramesPerSecond'
import { resizer, recorder } from '@/utils/observer/'
import { TorusPoints } from '@/components/objects/TorusPoints'
import { Particles } from '@/components/objects/Particles'

class App {
  private engine: CustomEngine
  private fps: FramesPerSecond
  private torusPoints: TorusPoints
  private particles: Particles

  constructor() {
    this.fps = new FramesPerSecond(18)
    this.engine = new CustomEngine('#app')
    this.torusPoints = new TorusPoints()
    this.particles = new Particles()

    this.engine.add(this.torusPoints)
    this.engine.add(this.particles)

    resizer.add(this.onWindowResize.bind(this))
    recorder.add(this.onTick.bind(this))
  }

  private onTick(): void {
    if (!this.fps.check) {
      return
    }
    this.engine.update()
  }

  private onWindowResize(): void {
    this.engine.resize()
  }
}

new App()
