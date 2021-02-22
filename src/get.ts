import {isArray, isRecord} from './helpers'

export function getProperty(source: Record<string, unknown> | Array<unknown>, prop: string): unknown {
  return isArray(source) ? source[Number(prop)] : source[prop]
}

function getByPath(source: Record<string, unknown> | Array<unknown>, path: string[]): unknown {
  if (!source) {
    return undefined
  }

  const prop = path.shift()
  const value = getProperty(source, prop)

  if (path.length && (isArray(value) || isRecord(value))) {
    return getByPath(value, path)
  }

  return value
}

export function get(source: Record<string, unknown> | Array<unknown>, key?: string): unknown {
  if (!key) {
    return source
  }

  return getByPath(source, key.split('/'))
}
