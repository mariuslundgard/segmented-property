export function basicAssign(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  let prop

  for (prop in source) {
    if (Object.prototype.hasOwnProperty.call(source, prop)) {
      target[prop] = source[prop]
    }
  }

  return target
}

export function shallowClone(
  source: Record<string, unknown> | Array<unknown>
): Record<string, unknown> | Array<unknown> {
  if (isArray(source)) return source.slice(0)
  if (isRecord(source)) return basicAssign({}, source)

  throw new Error('shallowClone: source must be an object or an array')
}

export function isArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value)
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return value && typeof value === 'object'
}
