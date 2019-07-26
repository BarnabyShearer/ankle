import {
    TextureLoader,
    SphereBufferGeometry,
    MeshLambertMaterial,
    Mesh,
} from "three"
import { SceneObject } from "./smaa"

export default class Sphere implements SceneObject {
  public obj: Mesh
  constructor(texture: string) {
    // Load texture and map on sphere
    this.obj = new Mesh(new SphereBufferGeometry(1, 32, 32))
    this.obj.rotateY(-Math.PI / 2)
    new TextureLoader().load(texture, (map) => {
      (this.obj as Mesh).material = new MeshLambertMaterial({ map })
    })
  }
}
