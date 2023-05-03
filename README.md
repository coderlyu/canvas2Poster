# canvas2posterjs
draw with canvas，is faster then html2Canvas

## usage

### install
`npm i canvas2posterjs -S`

### base
```js
import CanvasToPoster from 'canvas2posterjs'
const paint = new CanvasToPoster({
  painting: {
    width: '550px',
    height: '876px',
    background: '#f4f5f7',
    views: []
  },
  immediate: true,
  imageType: 'jpeg',
  onSuccess(canvas) {
    document.body.append(canvas)
  },
  onError(err) {
    console.log(err)
  }
})
```

### toImage
```js
new CanvasToPoster({
  painting: {
    width: '550px',
    height: '876px',
    background: '#f4f5f7',
    views: []
  },
  immediate: true,
  imageType: 'jpeg'
}).toImage().then((image) => {
  document.body.append(image)
})
```

### toBase64
```js
new CanvasToPoster({
  painting: {
    width: '550px',
    height: '876px',
    background: '#f4f5f7',
    views: []
  },
  immediate: true,
  imageType: 'jpeg'
}).toBase64().then((base64) => {
  const image = new Image()
  image.src = base64
  document.body.append(image)
})
```

### toCanvas
```js
new CanvasToPoster({
  painting: {
    width: '550px',
    height: '876px',
    background: '#f4f5f7',
    views: []
  },
  immediate: true,
  imageType: 'jpeg'
}).toCanvas().then((canvas) => {
  document.body.append(canvas)
})
```

## demo
```js
const painting = {
    width: '750px',
    height: '1334px',
    background: 'https://si.geilicdn.com/img-40d300000187ad60ace70a207569-unadjust_1125_2001.png?w=750',
    views: [
      {
        type: 'image',
        url: 'https://si.geilicdn.com/passport-0b67c6d7f6f35806c2107f1d030a93cf.jpg',
        css: {
          top: '95px',
          left: '327px',
          width: '102px',
          height: '102px',
          overflow: 'hidden',
          borderRadius: '50%',
          boxSizing: 'border-box',
          border: '2px solid #fff'
        }
      },
      {
        type: 'text',
        text: '灶门家门口的小树苗灶门家门口的小灶门家门口的小树苗灶门家门口的小',
        css: {
          top: '218px',
          left: '103px',
          width: '544px',
          fontFamily: 'PingFangSC-Heavy',
          fontSize: '32px',
          color: '#FFFFFF',
          maxLines: 1,
          textAlign: 'center',
          fontWeight: '400'
        }
      },
      {
        type: 'image',
        url: 'https://si.geilicdn.com/img-589400000187ad66c7ca0a210349-unadjust_1125_1500.png',
        css: {
          top: '294px',
          left: '75px',
          width: '600px',
          height: '800px'
        }
      },
      {
        type: 'text',
        text: '2022年12月5日',
        css: {
          top: '430px',
          left: '160px',
          width: '430px',
          height: '38px',
          fontFamily: 'PingFangSC-Heavy',
          fontSize: '32px',
          color: 'rgba(0,0,0,0.40)',
          textAlign: 'center',
          fontWeight: '400'
        }
      },
      {
        type: 'text',
        text: '天生万物，',
        css: {
          top: '542px',
          left: '160px',
          width: '430px',
          lineHeight: '32px',
          fontFamily: 'PingFangSC-Heavy',
          fontSize: '32px',
          color: 'rgba(0,0,0,0.70)',
          textAlign: 'center',
          fontWeight: '600'
        }
      },
      {
        type: 'text',
        text: '谋望皆通，',
        css: {
          top: '622px',
          left: '160px',
          width: '430px',
          lineHeight: '32px',
          fontFamily: 'PingFangSC-Heavy',
          fontSize: '32px',
          color: 'rgba(0,0,0,0.70)',
          textAlign: 'center',
          fontWeight: '600'
        }
      },
      {
        type: 'text',
        text: '福德相助，',
        css: {
          top: '702px',
          left: '160px',
          width: '430px',
          lineHeight: '32px',
          fontFamily: 'PingFangSC-Heavy',
          fontSize: '32px',
          color: 'rgba(0,0,0,0.70)',
          textAlign: 'center',
          fontWeight: '600'
        }
      },
      {
        type: 'text',
        text: '瑞气匆匆，',
        css: {
          top: '782px',
          left: '160px',
          width: '430px',
          lineHeight: '32px',
          fontFamily: 'PingFangSC-Heavy',
          fontSize: '32px',
          color: 'rgba(0,0,0,0.70)',
          textAlign: 'center',
          fontWeight: '600'
        }
      },
      {
        type: 'text',
        text: '戳一戳👉',
        css: {
          bottom: '154px',
          left: '105px',
          lineHeight: '40px',
          fontFamily: 'PingFangSC-Heavy',
          fontSize: '28px',
          color: '#fff',
          fontWeight: '500'
        }
      },
      
      {
        type: 'text',
        text: '抽签今日幸运签🎐',
        css: {
          bottom: '102px',
          left: '105px',
          lineHeight: '37px',
          fontFamily: 'PingFangSC-Heavy',
          fontSize: '28px',
          color: '#fff',
          fontWeight: '400'
        }
      },
      {
        type: 'rect',
        css: {
          right: '92px',
          bottom: '92px',
          width: '116px',
          height: '116px',
          color: '#fff'
        }
      },
      {
        type: 'qrcode',
        content: 'https://github.com/coderlyu/canvas2Poster',
        css: {
          right: '96px',
          bottom: '96px',
          width: '108px',
          height: '108px',
          background: '#fff'
        }
      }
    ]
  }
```
**效果**
<img width="400" src="https://si.geilicdn.com/img-5b7600000187b765df3a0a231447_750_1334.jpg" />


## API

### CanvasToPoster options

| 属性名       | 类型             | 说明                             | 默认值   |
| --------- | -------------- | ------------------------------ | ----- |
| painting  | object         | canvas上绘制内容的json描述，见下方             |       |
| immediate | boolean        | 是否在new CanvasToPoster的时候立即生成海报 | false |
| imageType | 生成base64的图片类型， | 默认jpeg，若支持webp，将会使用webp格式      | ''    |
| onSuccess | 海报成功的回调        |                                |       |
| onError   | 海报失败的回调        |                                |       |

### methods

| 方法名        | 入参                     | 说明                                                              |
| ---------- | ---------------------- | --------------------------------------------------------------- |
| startPaint | CanvasToPoster options | 在new CanvasToPoster 时，未设置immediate: true，可手动调用该方法同时传入最新的options |

### painting 对象
具体信息见下方

#### painting(画布props)
| 属性名称         | 类型     | 说明                       | 默认值 |
| ------------ | ------ | ------------------------ | --- |
| background   | string | 画布背景，可以是颜色值或者图片的链接，支持渐变色 | 白色  |
| width        | string | 画布的宽度，单位px               |     |
| height       | string | 画布的高度，单位px               |     |
| borderRadius | string | 边框的圆角                    | 0px |
| views        | array  | 数组，包含一系列对象，见下一节元素vies    |     |
#### view props

| 属性名     | 类型     | 说明                                 | 默认值 | 是否必须               |
| ------- | ------ | ---------------------------------- | --- | ------------------ |
| type    | string | view的类型（text, image, rect, qrcode） | 无   | 是                  |
| text    | string | 文本内容（type===text）                  | 无   | type=== text下必须    |
| url     | string | 图片(type===image)                   | 无   | type === image下必须  |
| content | string | 用改链接生成二维码（type === qrcode）         | 无   | type === qrcode下必须 |

##### text css
| 属性名称          | 类型     | 说明                                                                                                     | 默认值         |
| -------------- | ------ | ------------------------------------------------------------------------------------------------------ | ----------- |
| fontSize       | string | 字体大小                                                                                                   | 20px        |
| color          | string | 字体颜色                                                                                                   | black       |
| width          | string | 换行宽度，当文字长度大于width，换行                                                                                   |             |
| maxLines       | number | 最大行数                                                                                                   | 不限，根据width来 |
| lineHeight     | string | 行高(上下两行文字baseline的距离)                                                                                  | fontSize大小  |
| fontWeight     | string | 字体粗细，'normal','blod','bolder','lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900' | normal      |
| textDecoration | string | 文本修饰，支持underline, overline,line-through, 也可组合使用                                                        |             |
| textStyle      | string | fill：填充样式，stroke：镂空样式                                                                                  | fill        |
| fontFamily     | string | 字体，需引入字体                                                                                               | sans-serif  |
| background     | string | 文字背景颜色                                                                                                 |             |
| padding        | string | 文字背景颜色边际与文字间距                                                                                          | 0px         |
| textAlign      | string | 文字的对齐方式，分为left, center, right, view的对齐方法请看align属性                                                      | left        |
| textIndent     | string | 文字首行缩进                                                                                                 | 0px         |

##### image css
| 属性名    | 类型     | 说明                                                                                                                                  | 默认值        |
| ------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| width  | string | image的宽度                                                                                                                            | auto       |
| height | string | image的高度                                                                                                                            | auto       |
| mode   | string | 图片裁剪、缩放的模式(scaleToFill：不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素; aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。) | aspectFill |

##### qrcode css

| 属性名    | 类型     | 说明    | 默认值   |
| ------ | ------ | ----- | ----- |
| color  | string | 二维码颜色 | black |
| width  | string | 二维码宽度 |       |
| height | string | 二维码高度 |       |
##### rect css

| 属性名    | 类型     | 说明   | 默认值   |
| ------ | ------ | ---- | ----- |
| color  | string | 矩形颜色 | black |
| width  | string | 矩形宽度 |       |
| height | string | 矩形高度 |       |
