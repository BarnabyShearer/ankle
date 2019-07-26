import {
    ShaderMaterial,
    BufferGeometry,
    Points as ThreePoints,
    Float32BufferAttribute,
} from "three"

import { SceneObject } from "./smaa"


export default class Points implements SceneObject {
  public obj: ThreePoints
  private points = new Float32Array(200)
  private times = new Float32Array(100)
  private idx = 0
  constructor() {
    // Render circlur buffer of 100 points efficently
    this.obj = new ThreePoints(
      new BufferGeometry(),
      new ShaderMaterial({
        transparent: true,
        vertexShader: `
attribute float time;
varying float fragTime;
void main() {
  fragTime = time;
  float lon = radians(90.0 - position.y);
  float lat = radians(90.0 - position.x);
  float x = cos(lat) * cos(lon);
  float y = cos(lat) * sin(lon);
  float z = sin(lat);
  vec3 transformed = vec3(x, y, z);
  vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );
  gl_Position = projectionMatrix * mvPosition;
	gl_PointSize = 5.0;
}
`,
        fragmentShader: `
varying float fragTime;
#define PI 3.141592653589793
float ease(float t) {
  return sin(PI * t);
}
void main() {
    gl_FragColor = vec4(vec3(1, 0, 0), step(length(gl_PointCoord.xy - vec2(0.5)), .5) * ease(fragTime));
}`,
      }),
    )
    this.tick()
  }
  public set(lat: number, long: number) {
    this.points[this.idx * 2] = lat
    this.points[this.idx * 2 + 1] = long
    this.times[this.idx++] = 1
    this.idx %= 100
  }
  private tick() {
    const geo = this.obj.geometry as BufferGeometry
    this.times = this.times.map((v) => Math.max(0, v - 0.01))
    geo.addAttribute(
      "position",
      new Float32BufferAttribute(this.points, 2),
    )
    geo.addAttribute(
      "time",
      new Float32BufferAttribute(this.times, 1),
    )
    window.setTimeout(() => this.tick(), 20)
  }
}
