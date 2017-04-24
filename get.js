'use strict'

const getByPath = (source, path) => {
  const prop = path.shift()

  if (path.length)
    return getByPath(source[prop], path)

  return source[prop]
}

module.exports = function get (source, key) {
  if (!key)
    return source

  return getByPath(source, key.split('/'))
}
