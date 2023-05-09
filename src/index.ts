import Painter from './painter'
import { isEmpty, isFunction } from './utils'
import { Painting, Options } from './types'
import Hook from './hook'
export default class Canvas2Poster extends Hook {
    options: Options = {
        painting: {},
        dirty: false,
        widthPixels: 0,
        immediate: false,
        imageType: '',
        watch: false,
        upload: {},
        onSuccess(canvas: HTMLCanvasElement | null) {
            console.log(canvas)
        },
        onError(err) {
            console.log(err)
        }
    }
    promise = Promise.resolve()
    resolve = (canvas: any) => {
        console.log(canvas)
    }
    reject = (err: any) => {
        console.log(err)
    }
    plugins: any[] = []
    canvas: HTMLCanvasElement | null = null
    ctx: CanvasRenderingContext2D | null = null
    hooks: Record<string, any> = {}
    constructor(options: Options) {
        super()
        this.hooks = {
            beforeStart: this.createHook(),
            beforeEmits: this.createHook()
        }
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve
            this.reject = reject
        })
        Object.assign(this.options, options)
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        if (this.options.watch) this.reactiveOption(options)
        if (this.options.immediate) {
            // 立即 startPaint
            this.startPaint(options)
        }
    }
    startPaint(options = {}) {
        Object.assign(this.options, options)
        if (isEmpty(this.options.painting)) {
            return
        }
        setStringPrototype(1)
        // 下载图片
        this.downloadImages()
            .then(res => {
                const { width, height } = res
                if (!width || !height) {
                    console.error(
                        `You should set width and height correctly for painter, width: ${width}, height: ${height}`
                    )
                    return
                }
                let canvasWidthInPx = width.toPx()
                if (this.options.widthPixels) {
                    // 重设宽度，高度
                    setStringPrototype(
                        this.options.widthPixels / canvasWidthInPx
                    )
                    canvasWidthInPx = this.options.widthPixels
                }
                const canvasHeightInPx = height.toPx()
                // this.painterStyle = `width:${this.canvasWidthInPx}px;height:${this.canvasHeightInPx}px;`
                if (this.canvas) {
                    this.canvas.width = canvasWidthInPx
                    this.canvas.height = canvasHeightInPx
                }
                this.toPaint(res)
            })
            .catch(err => {
                this.reject(err)
                if (isFunction(this.options.onError)) this.options.onError?.(err)
            })
    }
    toPaint(res: Painting) {
        const painter = new Painter(this.ctx as CanvasRenderingContext2D, res)
        painter.paint(async () => {
            const next = () => {
                this.options.onSuccess?.(this.canvas)
                this.resolve(this.canvas)
            }
            try {
                const initData = { canvas: this.canvas }
                await this.hooks.beforeEmits.flush('sync', {
                    initData,
                    before(name: any) {
                        console.log('name', name)
                    }
                })
                next()
            } catch (error) {
                next()
            }
        })
    }
    downloadImages() {
        return new Promise<Painting>(resolve => {
            let preCount = 0
            let completeCount = 0
            const paintCopy: Painting = JSON.parse(
                JSON.stringify(this.options.painting)
            )
            if (paintCopy.background) {
                preCount++
                this.loadImage(paintCopy.background).then(
                    image => {
                        paintCopy.background = image
                        completeCount++
                        preCount === completeCount && resolve(paintCopy)
                    },
                    err => {
                        completeCount++
                        preCount === completeCount && resolve(paintCopy)
                        console.log(err)
                    }
                )
            }
            if (paintCopy.views) {
                for (const view of paintCopy.views) {
                    if (view && view.type === 'image' && view.url) {
                        preCount++
                        /* eslint-disable no-loop-func */
                        this.loadImage(view.url).then(
                            image => {
                                completeCount++
                                view.url = image
                                // 获得一下图片信息，供后续裁减使用
                                view.sWidth = image.width
                                view.sHeight = image.height
                                preCount === completeCount && resolve(paintCopy)
                            },
                            err => {
                                completeCount++
                                preCount === completeCount && resolve(paintCopy)
                                console.log(err)
                            }
                        )
                    }
                }
            }
            preCount === 0 && resolve(paintCopy)
            // if (preCount !== completeCount) {
            //   reject('paintCopy');
            // }
        })
    }
    loadImage(src: any) {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            if (src.startsWith('#')) {
                resolve(src)
                return
            }
            const img = new Image()
            img.onload = () => resolve(img)
            img.onerror = () => reject(`下载图片失败 ${src}`)
            img.crossOrigin = 'anonymous'
            img.src = src
            if (img.complete === true) {
                // Inline XML images may fail to parse, throwing an Error later on
                setTimeout(() => resolve(img), 500)
            }
        })
    }
    reactiveOption(options: Options) {
        // 不支持
        const that = this
        if (!isSupportProxy) return
        options.painting = new Proxy(options.painting, {
            set(target, key, value, receiver) {
                // 变化了
                that.startPaint()
                // todo 深度监听
                return Reflect.set(target, key, value, receiver)
            }
        })
    }
    toImage() {
        return new Promise((resolve, reject) => {
            return this.promise
                .then(() => {
                    const img = new Image()
                    img.src = this.getBase64()
                    img.onload = () => {
                        resolve(img)
                    }
                    img.onerror = err => {
                        reject(err)
                    }
                })
                .catch(reject)
        })
    }
    toCanvas() {
        return this.promise
    }
    toBase64() {
        return new Promise<string>((resolve, reject) => {
            return this.promise
                .then(() => {
                    resolve(this.getBase64())
                })
                .catch(reject)
        })
    }
    download(fileName?:string) {
        const exts = ['.jpg', '.jpeg', '.png', '.webp']
        function downloadImage(src: string, fileName = 'example', ext = '') {
            const link = document.createElement('a')
            link.href = src
            link.download = exts.some(e => fileName.endsWith(e)) ? fileName : `${fileName}.${ext}`
            link.click()
        }
        return this.toBase64().then((base64) => {
            const imageType = this.getImageType()
            const ext = imageType?.split('/')[1]
            downloadImage(base64, fileName, ext)
        })
    }
    getImageType() {
        let imageType = `image/${isSupportWebp ? 'webp' : 'jpeg'}`
        if (this.options.imageType) {
            imageType = this.options.imageType.startsWith('image/')
                ? this.options.imageType
                : `image/${this.options.imageType}`
        }
        return imageType
    }
    getBase64() {
        return (this.canvas && this.canvas.toDataURL(this.getImageType())) || ''
    }
    use(plugin: any) {
        if (this.plugins.includes(plugin)) {
            return
        }
        this.plugins.push(plugin)
        this.install(plugin)
    }
}

function setStringPrototype(scale: number) {
    /* eslint-disable no-extend-native */
    /**
     * 是否支持负数
     * @param {Boolean} minus 是否支持负数
     */
    String.prototype.toPx = function toPx(minus, baseSize) {
        if (this === '0') {
            return 0
        }
        let reg
        if (minus) {
            reg = /^-?[0-9]+([.]{1}[0-9]+){0,1}(px|%)$/g
        } else {
            reg = /^[0-9]+([.]{1}[0-9]+){0,1}(px|%)$/g
        }
        const results = reg.exec(this as string)
        if(!results) return 0
        const unit = results[2]
        const value = parseFloat(this as any)
        let res = 0
        if (unit === 'px') {
            res = Math.round(value * (scale || 1))
        } else if (unit === '%') {
            res = Math.round((value * baseSize) / 100)
        }
        return res
    }
}
/**
 * 判断是否支持 webp 图片
 */
const isSupportWebp = (function checkWebpSupport() {
    try {
        return (
            document
                .createElement('canvas')
                .toDataURL('image/webp', 0.5)
                .indexOf('data:image/webp') === 0
        )
    } catch (err) {
        return false
    }
})()

/**
 * 判断是否支持 Proxy
 */

const isSupportProxy = (function checkProxySupport() {
    try {
        if (typeof Proxy !== 'undefined') {
            return true
        }
        return false
    } catch (err) {
        return false
    }
})()
