import { WebGL } from '@/components/WebGL'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {
  ObjectComponent,
  CustomObjectType,
} from '@/components/objects/ObjectComponent'

export class CustomEngine extends WebGL {
  private objects: ObjectComponent[]
  private controls: OrbitControls

  constructor(element: HTMLDivElement | string) {
    super(element)

    this.objects = []
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }

  public add(obj: CustomObjectType): void {
    this.scene.add(obj)

    if ('update' in obj) {
      this.objects.push(obj)
    }
  }

  public remove(obj: CustomObjectType): void {
    this.scene.remove(obj)

    if ('update' in obj) {
      const index = this.objects.indexOf(obj)
      if (index > -1) {
        this.objects.splice(index, 1)
      }
    }
  }

  public update(): void {
    this.objects.forEach((obj) => obj.update())
    super.update()
  }

  public resize(): void {
    super.resize()
  }
}
