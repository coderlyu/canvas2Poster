const vUrl = require('./lib/index.cjs.js')
const url = new vUrl('https://h5.pre.weidian.com/m/draw-card-12?showTitle=0&transparentStatusBar=1/#/app?activityId=13')
url.delete('activityId').delete('showTitle').delete('transparentStatusBar').setParamString('name', 'cod').setQueryString('ff', 'coderl')
console.log(url.toString())
console.log(url)