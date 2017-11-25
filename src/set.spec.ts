import property from './'

describe('segmented-property/set', () => {
  it('should not mutate', () => {
    const obj1 = {foo: {bar: 1}}
    const obj2 = property.set(obj1, 'foo/bar', 2)
    expect(obj1.foo.bar).toEqual(1)
    expect(obj2.foo.bar).toEqual(2)
    expect(obj1 !== obj2).toEqual(true)
    expect(obj1.foo !== obj2.foo).toEqual(true)
    expect(obj1.foo.bar !== obj2.foo.bar).toEqual(true)
  })

  it('should only create new objects for changed paths', () => {
    const obj1 = {foo: {bar: {value: 1}, baz: {value: 1}}}
    const obj2 = property.set(obj1, 'foo/bar/value', 2)
    expect(obj1.foo.bar.value).toEqual(1)
    expect(obj2.foo.bar.value).toEqual(2)
    expect(obj1 !== obj2).toEqual(true)
    expect(obj1.foo !== obj2.foo).toEqual(true)
    expect(obj1.foo.bar !== obj2.foo.bar).toEqual(true)
    expect(obj1.foo.baz).toEqual(obj2.foo.baz)
  })

  it('should return new value if no key is provided', () => {
    const obj1 = {}
    const obj2 = {}
    expect(property.set(obj1, null, obj2)).toEqual(obj2)
  })

  it('should not create new object if nothing was changed', () => {
    const obj1 = {foo: {bar: 1}}
    const obj2 = property.set(obj1, 'foo/bar', 1)
    expect(obj1.foo.bar).toEqual(1)
    expect(obj1).toEqual(obj2)
  })

  it('should set array item', () => {
    const arr1 = [1, 2, 3]
    const arr2 = property.set(arr1, '1', 4)
    expect(Array.isArray(arr2)).toEqual(true)
    expect(arr2).toHaveLength(3)
    expect(arr2[1]).toEqual(4)
  })

  it('should set object key nested in an array item', () => {
    const arr1 = [{id: 1}, {id: 2}, {id: 3}]
    const arr2 = property.set(arr1, '1/id', 4)
    expect(Array.isArray(arr2)).toEqual(true)
    expect(arr2).toHaveLength(3)
    expect(arr2[1].id).toEqual(4)
  })
})
