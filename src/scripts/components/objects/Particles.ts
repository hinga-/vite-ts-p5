import {
  BufferAttribute,
  BufferGeometry,
  Object3D,
  Points,
  PointsMaterial,
} from 'three'
import { ObjectComponent } from '@/components/objects/ObjectComponent'

export class Particles extends Object3D implements ObjectComponent {
  private geometry: BufferGeometry
  private material: PointsMaterial
  private points: Points<BufferGeometry, PointsMaterial>

  private count: number
  private arr: Float32Array
  constructor() {
    super()

    this.geometry = new BufferGeometry()
    this.material = new PointsMaterial({ size: 0.005 })

    this.count = 5000
    this.arr = new Float32Array(this.count * 3)

    for (let i = 0; i < this.count * 3; i++) {
      this.arr[i] = (Math.random() - 0.5) * 4
    }

    this.geometry.setAttribute('position', new BufferAttribute(this.arr, 3))

    this.points = new Points(this.geometry, this.material)
    this.add(this.points)
  }

  public update(): void {}
}
