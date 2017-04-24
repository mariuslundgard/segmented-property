'use strict'

const assert = require('assert')
const {describe, it} = require('mocha')
const property = require('./')

describe('segmented-property', () => {
  describe('get', () => {
    it('should get a nested property', () => {
      const obj = {foo: {bar: 1}}
      assert.equal(property.get(obj, 'foo/bar'), 1)
    })

    it('should return undefined', () => {
      const obj = {foo: {bar: 1}}
      assert(typeof property.get(obj, 'foo/baz') === 'undefined')
    })

    it('should return object when no key is provided', () => {
      const obj = {}
      assert.equal(property.get(obj), obj)
    })
  })

  describe('set', () => {
    it('should not mutate', () => {
      const obj1 = {foo: {bar: 1}}
      const obj2 = property.set(obj1, 'foo/bar', 2)
      assert.notEqual(obj1, obj2)
      assert.notEqual(obj1.foo, obj2.foo)
      assert.notEqual(obj1.foo.bar, obj2.foo.bar)
    })

    it('should only create new objects for changed paths', () => {
      const obj1 = {foo: {bar: {value: 1}, baz: {value: 1}}}
      const obj2 = property.set(obj1, 'foo/bar/value', 2)
      assert.notEqual(obj1, obj2)
      assert.notEqual(obj1.foo, obj2.foo)
      assert.notEqual(obj1.foo.bar, obj2.foo.bar)
      assert.equal(obj1.foo.baz, obj2.foo.baz)
    })

    it('should return new value if no key is provided', () => {
      const obj1 = {}
      const obj2 = {}
      assert.equal(property.set(obj1, null, obj2), obj2)
    })

    it('should not create new object if nothing was changed', () => {
      const obj1 = {foo: {bar: 1}}
      const obj2 = property.set(obj1, 'foo/bar', 1)

      assert.equal(obj1, obj2)
    })
  })
})
