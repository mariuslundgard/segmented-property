import {get, _getProperty} from './get'
import {_isArray, _isRecord, _shallowClone} from './helpers'

/**
 * @internal
 */
export function _setProperty(source: Record<string, unknown> | Array<unknown>, prop: string, value: unknown): void {
  if (_isArray(source)) {
    source[Number(prop)] = value
  }

  if (_isRecord(source)) {
    source[prop] = value
  }
}

/**
 * @public
 */
export function set(
  source: Record<string, unknown> | Array<unknown>,
  key: string,
  value: unknown
): Record<string, unknown> | Array<unknown> {
  if (!key) {
    if (_isArray(value) || _isRecord(value)) {
      return value
    }

    throw new Error('set: cannot replace value with a non-record value')
  }

  if (get(source, key) === value) {
    return source // nothing changed
  }

  const target = _shallowClone(source)
  const path = key.split('/')

  let currSource = source
  let currTarget = target

  while (path.length) {
    const prop = path.shift()

    if (path.length) {
      let nextSource = _getProperty(currSource, prop)

      if (nextSource === undefined) {
        nextSource = {}
        _setProperty(currSource, prop, nextSource)
      }

      if (!_isArray(nextSource) && !_isRecord(nextSource)) {
        throw new Error(`set: path is not targeting an object nor an array: "${key}"`)
      }

      currSource = nextSource

      const nextTarget = _shallowClone(currSource)

      _setProperty(currTarget, prop, nextTarget)

      currTarget = nextTarget
    } else {
      _setProperty(currTarget, prop, value)
    }
  }

  return target
}
