/* tslint:disable:max-classes-per-file */

declare module "postprocessing" {
  import {Camera, Renderer, ImageLoader, Scene} from "three"

  class EffectComposer {
    public renderer: Renderer
    constructor(render: Renderer)
    public addPass(pass: RenderPass|NormalPass|EffectPass): null
    public setSize(width: number, height: number): null
    public render(): null
  }
  class RenderPass {
    public renderToScreen: boolean
    constructor(scene: Scene, camera: Camera)
  }
  class NormalPass {
    constructor(scene: Scene, camera: Camera, config: {resolutionScale?: number})
  }
  class EffectPass {
    public renderToScreen: boolean
    constructor(camera: Camera, effect: SMAAEffect)
  }
  class SMAAEffect {
    public static areaImageDataURL: string
    public static searchImageDataURL: string
    constructor(search: HTMLImageElement, area: HTMLImageElement)
  }
}
