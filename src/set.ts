import {get, getProperty} from './get'
import {isArray, isRecord, shallowClone} from './utils'

export function setProperty(source: Record<string, unknown> | Array<unknown>, prop: string, value: unknown): void {
  if (isArray(source)) {
    source[Number(prop)] = value
  }

  if (isRecord(source)) {
    source[prop] = value
  }
}

export function set(
  source: Record<string, unknown> | Array<unknown>,
  key: string,
  value: unknown
): Record<string, unknown> | Array<unknown> {
  if (!key) {
    if (isArray(value) || isRecord(value)) {
      return value
    }

    throw new Error('set: cannot replace value with a non-record value')
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
      let nextSource = getProperty(currSource, prop)

      if (nextSource === undefined) {
        nextSource = {}
        setProperty(currSource, prop, nextSource)
      }

      if (!isArray(nextSource) && !isRecord(nextSource)) {
        throw new Error(`set: path is not targeting an object nor an array: "${key}"`)
      }

      currSource = nextSource

      const nextTarget = shallowClone(currSource)

      setProperty(currTarget, prop, nextTarget)

      currTarget = nextTarget
    } else {
      setProperty(currTarget, prop, value)
    }
  }

  return target
}
