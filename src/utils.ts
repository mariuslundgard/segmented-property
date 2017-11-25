export function basicAssign(target: any, source: any) {
  let prop

  for (prop in source) {
    if (Object.prototype.hasOwnProperty.call(source, prop)) {
      target[prop] = source[prop]
    }
  }

  return target
}

export function isArray(obj: any) {
  return Array.isArray ? Array.isArray(obj) : Object.prototype.toString.call(obj) === '[object Array]'
}

export function shallowClone(source: any) {
  return isArray(source) ? source.slice() : basicAssign({}, source)
}
