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
export function _shallowClone(
  source: Record<string, unknown> | Array<unknown>
): Record<string, unknown> | Array<unknown> {
  if (_isArray(source)) return source.slice(0)
  if (_isRecord(source)) return _basicAssign({}, source)

  throw new Error('shallowClone: source must be an object or an array')
}
