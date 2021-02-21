import property from '.'

describe('segmented-property/get', () => {
  it('should get a nested property', () => {
    const obj = {foo: {bar: 1}}

    expect(property.get(obj, 'foo/bar')).toEqual(1)
  })

  it('should return undefined', () => {
    const obj = {foo: {bar: 1}}

    expect(property.get(obj, 'foo/baz')).toBeUndefined()
  })

  it('should return object when no key is provided', () => {
    const obj = {}

    expect(property.get(obj)).toEqual(obj)
  })

  it('should return array item', () => {
    const arr = [1, 2, 3]

    expect(property.get(arr, '1')).toEqual(2)
  })

  it('should return object value in an array item', () => {
    const arr = [{id: 1}, {id: 2}, {id: 3}]

    expect(property.get(arr, '1/id')).toEqual(2)
  })
})
