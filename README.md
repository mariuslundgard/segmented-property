# segmented-property

A utility for setting and getting properties on JavaScript objects as slash-delimited paths.

```sh
npm install segmented-property
```

[![build status](https://img.shields.io/travis/mariuslundgard/segmented-property/master.svg?style=flat-square)](https://travis-ci.org/mariuslundgard/segmented-property)
[![npm version](https://img.shields.io/npm/v/segmented-property.svg?style=flat-square)](https://www.npmjs.com/package/segmented-property)

## Features

* Immutable. Doesn't modify source objects, but adheres to the principle of [persistent data structures](https://en.wikipedia.org/wiki/Persistent_data_structure).
* Path-based. Set nested properties using e.g. `foo/bar/baz`.

## Motivation

Inspired by `@yr/property`, however, I needed something even simpler/smaller.

## Usage

### `get(source, [key])`

```js
import {get} from 'segmented-property'

const obj = {foo: {bar: 1}}

console.log(get(obj, 'foo/bar')) // 1
```

### `set(source, [key], value)`

```js
import {get, set} from 'segmented-property'

const obj1 = {foo: {bar: 1}}
const obj2 = set(obj1, 'foo/bar', 2)

console.log(get(obj1, 'foo/bar')) // 1
console.log(get(obj2, 'foo/bar')) // 2
```
