import {_getByPath} from './helpers'

/**
 * @public
 */
export function get(source: Record<string, unknown> | Array<unknown>, key?: string): unknown {
  if (!key) {
    return source
  }

  return _getByPath(source, key.split('/'))
}
