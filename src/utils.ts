export const isEmpty = (object: any) => {
  for (const _i in object) {
    return false
  }
  return true
}

export const isObject = (obj: any) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export const isFunction = (obj: any) => {
  return typeof obj === 'function'
}
export const isPromise = (obj: any) => {
  return isFunction(obj) && isFunction(obj.then) && isFunction(obj.catch)
}