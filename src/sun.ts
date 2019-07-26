import {
    DirectionalLight,
    Object3D,
    MeshPhongMaterial,
} from "three"

import { SceneObject } from "./smaa"

const DAY = 1000 * 60 * 60 * 24
const YEAR = DAY * 366

export default class Sun implements SceneObject {
  public obj: Object3D
  constructor(date: Date) {
    // Calc Aprox. position for time and season.
    // Note we are using the Ptolemaic system
    const light = new DirectionalLight(0xffffff)
    light.position.z = -100
    this.obj = new Object3D()
    this.obj.add(light)
    this.obj.rotateY(-date.getHours() / 12 * Math.PI)
    this.obj.rotateX(-Math.PI / 8 * Math.cos(date.getTime() / YEAR * Math.PI * 2))
  }
}
