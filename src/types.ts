export interface Options {
  painting: Painting
  dirty?: boolean
  widthPixels?: number
  immediate?: boolean
  imageType?: string
  watch?: boolean
  upload?: OptionsUpload
  onSuccess?: (canvas: HTMLCanvasElement | null) => void
  onError?: (err: any) => void
}

export type AnyOptions = Options & { [props: string]: any }

export interface OptionsUpload {
  secret?:string
  scope?: string
  env?:string
  uploadType?: string
}
export interface Painting {
  background?: string | HTMLImageElement
  width?: string
  height?: string
  borderRadius?: string
  views?: Array<PaintingView>
}
export interface PaintingView {
  id?: string
  type: 'text'| 'image' | 'qrcode' | 'rect'
  url?: string | HTMLImageElement
  text?: string
  css?: PaintingViewCss
  sWidth?: string | number
  sHeight?: string | number
}

export interface PaintingViewCss {
  width?: number
  height?: number
  background?: string | HTMLImageElement
  rotate?: string
  top?: string
  right?: string
  bottom?: string
  left?: string | string[]
}

export interface PaintingViewTextCss {
  fontSize?: string
  color?: string
  width?: number
  maxLines?: number
  lineHeight?: string
  fontWeight?: string
  textDecoration?: string
  textStyle?: string
  fontFamily?: string
  background?: string | HTMLImageElement
  padding?: string
  textAlign?: string
  textIndent?: string
  rotate?: string
  top?: string
  right?: string
  bottom?: string
  left?: string | string[]
}
export interface PaintingViewImageCss {
  color?: string
  width?: number
  mode?: 'scaleToFill' | 'aspectFill'
  top?: string
  right?: string
  bottom?: string
  left?: string
}
export interface PaintingViewQrcodeCss {
  color?: string
  width?: number
  top?: string
  right?: string
  bottom?: string
  left?: string
}

export interface PaintingViewRectCss {
  color?: string
  width?: number
  mode?: 'scaleToFill' | 'aspectFill'
  top?: string
  right?: string
  bottom?: string
  left?: string
}
declare global {
  interface String {
    toPx(minus?: any, baseSize?: any): number
  }
}


// Painter