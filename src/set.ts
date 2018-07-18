import {get} from './get'
import {shallowClone} from './utils'

export function set(source: any, key: string, value: any) {
  if (!key) {
    return value
  }

  if (get(source, key) === value) {
    return source // nothing changed
  }

  const target = shallowClone(source)
  const path = key.split('/')

  let currSource = source
  let currTarget = target

  while (path.length) {
    const prop = path.shift()

    if (path.length) {
      if (!currSource[prop]) {
        currSource[prop] = {}
      }

      currSource = currSource[prop]
      currTarget[prop] = shallowClone(currSource)
      currTarget = currTarget[prop]
    } else {
      currTarget[prop] = value
    }
  }

  return target
}
