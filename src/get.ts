import {_isArray, _isRecord} from './helpers'

/**
 * @internal
 */
export function _getProperty(source: Record<string, unknown> | Array<unknown>, prop: string): unknown {
  return _isArray(source) ? source[Number(prop)] : source[prop]
}

/**
 * @internal
 */
function _getByPath(source: Record<string, unknown> | Array<unknown>, path: string[]): unknown {
  if (!source) {
    return undefined
  }

  const prop = path.shift()
  const value = _getProperty(source, prop)

  if (path.length && (_isArray(value) || _isRecord(value))) {
    return _getByPath(value, path)
  }

  return value
}

/**
 * @public
 */
export function get(source: Record<string, unknown> | Array<unknown>, key?: string): unknown {
  if (!key) {
    return source
  }

  return _getByPath(source, key.split('/'))
}
