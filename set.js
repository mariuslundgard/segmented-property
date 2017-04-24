'use strict'

const get = require('./get')

const basicAssign = (target, source) => {
  let prop

  for (prop in source) {
    if (Object.prototype.hasOwnProperty.call(source, prop)) {
      target[prop] = source[prop]
    }
  }

  return target
}

module.exports = function set (source, key, value) {
  if (!key)
    return value

  if (get(source, key) === value)
    return source // nothing changed

  const target = basicAssign({}, source)
  const path = key.split('/')

  let currSource = source
  let currTarget = target

  while (path.length) {
    const prop = path.shift()

    if (path.length) {
      currSource = currSource[prop]
      currTarget[prop] = basicAssign({}, currSource)
      currTarget = currTarget[prop]
    } else {
      currTarget[prop] = value
    }
  }

  return target
}
