[![Build Status](https://travis-ci.org/kaelzhang/node-mix2.svg?branch=master)](https://travis-ci.org/kaelzhang/node-mix2)

# mix2

The port of YUI3's mix method for node. Mixins two objects.

## Install

```bash
$ npm install mix2
```

## Usage

```js
const a = {a: 1}
const b = {b: 2}
const c = {a: 10, b: 20, c: 30}

mix(a, b)
console.log(a) // {a: 1, b: 2}

// Will not override the existing property 'a'
mix({a: 1}, c, false)             // {a: 1,  b: 20, c: 30}

// Only copy property 'a' and 'c', and override.
mix({a: 1}, c, true, ['a', 'c'])  // {a: 10, c: 30}
```

### mix(receiver, supplier, [override], [copylist])

- receiver `Object`
- supplier `Object`
- override `Boolean=true` Whether should override the existing property of `receiver`. Default to overriding(`true`)
- copylist `(Array.<String>)=` If specified, only mix the specific keys in the array. Otherwise, mixin all properties.

Extend the object `receiver` with `supplier`, and returns `receiver`.

## License

MIT
<!-- do not want to make nodeinit to complicated, you can edit this whenever you want. -->
