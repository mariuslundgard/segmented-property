/**
 * @internal
 */
export function _basicAssign(
  target: Record<string, unknown>,
  source: Record<string, unknown>
): Record<string, unknown> {
  let prop

  for (prop in source) {
    if (Object.prototype.hasOwnProperty.call(source, prop)) {
      target[prop] = source[prop]
    }
  }

  return target
}

/**
 * @internal
 */
export function _getProperty(source: Record<string, unknown> | Array<unknown>, prop: string): unknown {
  return _isArray(source) ? source[Number(prop)] : source[prop]
}

/**
 * @internal
 */
export function _getByPath(source: Record<string, unknown> | Array<unknown>, path: string[]): unknown {
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
 * @internal
 */
export function _isArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value)
}

/**
 * @internal
 */
export function _isRecord(value: unknown): value is Record<string, unknown> {
  return value && typeof value === 'object'
}

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
 * @internal
 */
export function _shallowClone(
  source: Record<string, unknown> | Array<unknown>
): Record<string, unknown> | Array<unknown> {
  if (_isArray(source)) return source.slice(0)
  if (_isRecord(source)) return _basicAssign({}, source)

  throw new Error('shallowClone: source must be an object or an array')
}
