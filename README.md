# segmented-property

A utility for immutably setting and getting properties on JavaScript objects as slash-delimited paths.

```sh
npm install segmented-property
```

[![build status](https://img.shields.io/travis/mariuslundgard/segmented-property/master.svg?style=flat-square)](https://travis-ci.org/mariuslundgard/segmented-property)
[![coverage status](https://img.shields.io/coveralls/mariuslundgard/segmented-property/master.svg?style=flat-square)](https://coveralls.io/github/mariuslundgard/segmented-property?branch=master)
[![npm version](https://img.shields.io/npm/v/segmented-property.svg?style=flat-square)](https://www.npmjs.com/package/segmented-property)

## Usage

```js
import {get, set} from 'segmented-property'

const obj1 = {foo: {bar: 1}}
const obj2 = set(obj1, 'foo/bar', 2)

console.log(get(obj1, 'foo/bar')) // 1
console.log(get(obj2, 'foo/bar')) // 2
```

## API

#### `get(source, [key])`

Gets a value.

#### `set(source, [key], value)`

Sets a new value and returns a new object.
