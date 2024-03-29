export interface Options {
  painting: Painting
  dirty?: boolean
  widthPixels?: number
  immediate?: boolean
  imageType?: string
  imageQuality?: number
  onSuccess?: (canvas: HTMLCanvasElement | null) => void
  onError?: (err: any) => void
}

export type AnyOptions = Options & { [props: string]: any }

type PaintingBaseView = {
  id?: string
  sWidth?: string | number
  sHeight?: string | number
}

type PaintingViewBaseCss = {
  color?: string
  padding?:string
  top?: string
  right?: string
  bottom?: string
  left?: string | string[]
  width?: string
  height?: string
  rotate?: string
  align?: 'center' | 'right' | 'left'
  verticalAlign?: 'top' | 'center' | 'bottom'
  borderWidth?: string
  borderStyle?: string
  borderColor?: string
  borderRadius?: string
  overflow?: string
}

export type Views = PaintingTextView | PaintingImageView | PaintingQrcodeView | PaintingRectView

export interface Painting {
  background?: string | HTMLImageElement
  width?: string
  height?: string
  borderRadius?: string
  views?: Array<Views>
}

export type PaintingTextView = {
  type: 'text'
  text?: string
  css?: PaintingTextViewCss
} & PaintingBaseView

export type PaintingImageView =  {
  type: 'image'
  url?: string | HTMLImageElement
  css?: PaintingImageViewCss
} & PaintingBaseView

export type PaintingQrcodeView =  {
  type: 'qrcode'
  content?: string
  css?: PaintingQrcodeViewCss
} & PaintingBaseView

export type PaintingRectView =  {
  type: 'rect'
  css?: PaintingRectViewCss
} & PaintingBaseView

export type PaintingTextViewCss =  {
  fontSize?: string
  maxLines?: number
  lineHeight?: string
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  textDecoration?: string
  textStyle?: 'italic' | 'stroke' | 'normal'
  fontFamily?: string
  background?: string | HTMLImageElement
  textIndent?: string
  textAlign?: 'left' | 'center' | 'right'
} & PaintingViewBaseCss

export type PaintingImageViewCss = {
  width?: 'auto' | string
  height?: 'auto' | string
  color?: string
  mode?: 'scaleToFill' | 'aspectFill'
} & PaintingViewBaseCss

export type PaintingQrcodeViewCss = {
  background?: string
} & PaintingViewBaseCss

export type PaintingRectViewCss = {
} & PaintingViewBaseCss

declare global {
  interface String {
    toPx(minus?: any, baseSize?: any): number
  }
}
