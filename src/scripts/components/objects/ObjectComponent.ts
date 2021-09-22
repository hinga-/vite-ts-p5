import { Object3D } from 'three'

// 1つで間に合いそうな気もする。。。
export interface ObjectComponent extends Object3D {
  update(): void
}

export type CustomObjectType = ObjectComponent | Object3D
