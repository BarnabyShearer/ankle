declare module 'postprocessing' {
  import {Camera, Renderer, ImageLoader, Scene} from "three"

  class EffectComposer {
    public renderer: Renderer
    constructor (render: Renderer)
    addPass(pass: RenderPass|NormalPass|EffectPass): null
    setSize(width: number, height: number): null
    render (): null
  }
  class RenderPass{
    constructor(scene: Scene, camera: Camera)
    renderToScreen: boolean
  }
  class NormalPass{
    constructor(scene: Scene, camera: Camera, config: {resolutionScale?: number})
  }
  class EffectPass{
    constructor (camera: Camera, effect: SMAAEffect)
    renderToScreen: boolean
  }
  class SMAAEffect{
    constructor (search: HTMLImageElement, area: HTMLImageElement)
    public static areaImageDataURL: string
    public static searchImageDataURL: string
  }
}