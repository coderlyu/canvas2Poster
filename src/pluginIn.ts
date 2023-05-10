import { isFunction, isPromise, isObject } from "./utils"

//TODO
export class Hook {
  eventList: any[] = []
  constructor() {}
  tap(name: string, callback: Function) {
    this.eventList.push({
      name, callback
    })
  }
  // sync
  async flush({ initData = undefined, before = (_name: string, _data?: any) => {} }) {
    for (let i = 0; i < this.eventList.length; i++) {
      const { name, callback } = this.eventList[i]
      await before(name, initData)
      if(isPromise(callback)) {
        await callback as Promise<any>;
      } else {
        await (callback as Function)(initData)
      }
    }
  }
}

export default class PluginIn {
  pluginList: any[] = []
  constructor() {}
  createHook() {
    return new Hook()
  }
  install(plugin: any) {
    const result: Record<string, any> = {
      value: undefined,
      options: {},
      plugin: plugin
    }
    if(isFunction(plugin)) {
      result.value = plugin.call(this)
    } else if(isObject(plugin)) {
      result.value = plugin.apply.call(this)
    } else {
      throw new Error('plugin error')
    }
    this.pluginList.push(result)
  }
}