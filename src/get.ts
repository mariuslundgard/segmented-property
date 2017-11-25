function getByPath(source: any, path: string[]): any {
  const prop = path.shift()

  if (path.length) {
    return getByPath(source[prop], path)
  }

  return source[prop]
}

export function get(source: any, key?: string) {
  if (!key) {
    return source
  }

  return getByPath(source, key.split('/'))
}
