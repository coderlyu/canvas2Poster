/**
* @jest-environment jsdom
*/
const Canvas2Poster = require('../lib/index.cjs')
const { expect } = require('chai');

describe('[canvas2Poster]: 基本功能测试', () => {
  new Canvas2Poster({
    painting: {
      width: '750px',
      height: '1440px',
      views: []
    },
    onSuccess(res) {
      expect(res).not.equal('')
    }
  })
}) 