import { Color, Points, PointsMaterial, Object3D, TorusGeometry } from 'three'
import { ObjectComponent } from '@/components/objects/ObjectComponent'

export class TorusPoints extends Object3D implements ObjectComponent {
  private geometry: TorusGeometry
  private material: PointsMaterial
  private points: Points<TorusGeometry, PointsMaterial>

  constructor() {
    super()
    this.geometry = new TorusGeometry(0.7, 0.2, 16, 100)
    this.material = new PointsMaterial({
      color: new Color(0xffffff),
      size: 0.005,
    })

    this.points = new Points(this.geometry, this.material)
    this.add(this.points)
  }

  public update(): void {
    this.rotation.y += 0.01
  }
}
