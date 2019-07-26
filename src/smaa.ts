import {
    EffectComposer,
    RenderPass,
    NormalPass,
    EffectPass,
    SMAAEffect,
} from "postprocessing"
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Object3D,
} from "three"

export interface SceneObject {
  obj: Object3D
}

export default class SMAA {
  private composer: EffectComposer
  private scene: Scene
  private camera: PerspectiveCamera
  private cameraPivot: Object3D
  private lat: number = 0
  private long: number = 0
  constructor() {
    // Construct a basic scene with a camera and SMAA post-processing
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(60, 1, 0.1, 5)
    this.camera.position.z = 2
    this.cameraPivot = new Object3D()
    this.cameraPivot.add(this.camera)
    this.scene.add(this.cameraPivot)
    const renderPass = new RenderPass(this.scene, this.camera)
    renderPass.renderToScreen = false
    const normalPass = new NormalPass(this.scene, this.camera, {
      resolutionScale: 1.0,
    })
    const areaImage = new Image()
    areaImage.src = SMAAEffect.areaImageDataURL
    const searchImage = new Image()
    searchImage.src = SMAAEffect.searchImageDataURL
    const smaaEffect = new SMAAEffect(searchImage, areaImage)
    const effectPass = new EffectPass(this.camera, smaaEffect)
    effectPass.renderToScreen = true
    this.composer = new EffectComposer(new WebGLRenderer())
    this.composer.addPass(renderPass)
    this.composer.addPass(normalPass)
    this.composer.addPass(effectPass)
    window.setTimeout(() => this.tick(), 20)
  }
  public render() {
    this.composer.render()
  }
  public setElement(element: Element) {
    // Set the output element
    this.camera.aspect = element.clientWidth / element.clientHeight
    this.camera.updateProjectionMatrix()
    this.composer.setSize(element.clientWidth, element.clientHeight)
    element.appendChild(this.composer.renderer.domElement)
  }
  public add(item: SceneObject) {
    // Append object to scene
    this.scene.add(item.obj)
  }
  public set(lat: number, long: number) {
    // Sets the camera destination
    this.lat = -lat / 180 * Math.PI
    this.long = long / 180 * Math.PI
  }
  public tick() {
    // Spin towards destionation (speed proportional to difference)
    this.cameraPivot.rotation.x += (this.lat - this.cameraPivot.rotation.x) / 10
    this.cameraPivot.rotation.y += (this.long - this.cameraPivot.rotation.y) / 10
    window.setTimeout(() => this.tick(), 20)
  }
}
