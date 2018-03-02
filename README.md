# base58-random

Generate random [base58 strings]() quickly with better 
[statistical dispersion](https://en.wikipedia.org/wiki/Statistical_dispersion)
than `Math.random()` unless Math.random is all that's available.

Largely based on [`uuid-random`](https://github.com/jchook/uuid-random)

## Install

    yarn add base58-random
    npm install base58-random

## Example Usage

### Node

```javascript
var base58 = require('base58-random');
base58(12); // 'KsykHbcCzUSL'
```

### Browser

```html
<script src="https://cdn.rawgit.com/deployable/base58-random/v0.1.0/base58-random.min.js"></script>
<script>
  base58(13); // 'BAho2V4BfUmo3'
</script>
```


### Is base58 string?

```javascript
base58.test('4rhdLsp32qn'); // true
base58.test('5HXx8Eznu0'); // false
base58.test('P-f6cA4e'); // false
```

## License

MIT

## Links

- Also see [deployable/base62-random](https://github.com/deployable/base62-random)
- Based on [jchook/uuid-random](https://github.com/jchook/uuid-random)
- github [deployable/base58-random](https://github.com/deployable/base58-random)
- npm [base62-random](https://www.npmjs.com/package/base58-random)

