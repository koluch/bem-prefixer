# bem-prefixer
Library for generation of BEM-style CSS selectors

[![Build Status](https://travis-ci.org/koluch/bem-prefixer.svg?branch=master)](https://travis-ci.org/koluch/bem-prefixer.svg?branch=master)

## Install

    npm install --save bem-prefixer

## Usage

This library could create BEM-style selectors from special selectors (wich is subset of CSS selectors): it interprets id part in selector as a block name and classes as modifiers. For example:

```javascript
import prefixer from 'bem-prefixer'

const bem = prefixer("BlockName")

// Generate block selector
console.log(bem("div")) // "div.Block"

// Generate selector for block with modifiers
console.log(bem("div.current")) // "div.Block.Block--current"

// Generate element selector
console.log(bem("div#header")) // "div.Block__header"

// Generate selector for element with modifiers
console.log(bem("div#header.highlighted")) // "div.Block__header.Block__header--highlighted"
```

It is also possible to pass BEM-names as arguments:

```javascript
import prefixer from 'bem-prefixer'

const bem = prefixer("BlockName")

// Suppose we have element and modifiers as variables
const elementName = "header" 
const elementModifiers = ["header", "highlighted"]
const blockModifiers = ["current"]

// Generate block selector
console.log(bem("div")) // "div.Block"

// Generate selector for block with modifiers
console.log(bem("div", blockModifiers)) // "div.Block.Block--current"

// Generate element selector
console.log(bem("div", elementName)) // "div.Block__header"

// Generate selector for element with modifiers
console.log(bem("div", elementName, modifiers)) // "div.Block__header.Block__header--highlighted"
```

## License

MIT
