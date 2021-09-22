import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { Core } from '@/components/Core'

export class WebGL extends Core {
  private width!: number
  private height!: number
  private dpr!: number
  protected renderer!: WebGLRenderer
  protected scene!: Scene
  protected camera!: PerspectiveCamera

  constructor(element: HTMLDivElement | string) {
    super(element)

    if (!this.element) {
      // console.warn()
      return
    }

    this.width = this.element.offsetWidth
    this.height = this.element.offsetHeight
    this.dpr = window.devicePixelRatio
      ? Math.min(1.5, window.devicePixelRatio)
      : 1

    this.createRenderer()
    this.createScene()
    this.createCamera()

    this.resize()
  }

  private createRenderer(): void {
    this.renderer = new WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(this.dpr)
    ;(this.element as HTMLDivElement).appendChild(this.renderer.domElement)
  }

  private createScene(): void {
    this.scene = new Scene()
  }

  private createCamera(): void {
    this.camera = new PerspectiveCamera(75, this.width / this.height, 0.1, 100)
    this.camera.position.z = 2
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }

  private render(): void {
    this.renderer.render(this.scene, this.camera)
  }

  protected update(): void {
    this.render()
  }

  protected resize(): void {
    this.width = (this.element as HTMLDivElement).offsetWidth
    this.height = (this.element as HTMLDivElement).offsetHeight

    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()

    this.renderer.clear()
    this.renderer.setSize(this.width, this.height)
  }
}
