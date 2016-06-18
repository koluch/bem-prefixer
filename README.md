# bem-prefixer
Library for generation of BEM-style CSS selectors

[![Build Status](https://travis-ci.org/koluch/bem-prefixer.svg?branch=master)](https://travis-ci.org/koluch/bem-prefixer?branch=master)

## Install

    npm install --save bem-prefixer

## Usage

This library could create BEM-style selectors from special kind of selectors (which look like CSS selectors): it interprets id part of selector as a block name and classes part as modifiers. For example:

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

## Usage with hyperscript-like libraries

It is very convinient to use this library together with hyperscript-like libraries (e.g [react-markup](https://github.com/koluch/react-markup) or [react-hyperscript](https://github.com/mlmorg/react-hyperscript)). `react-hyperscript` example:

```javascript
import h from 'react-hyperscript';
import React from 'react';
import prefixer from 'bem-prefixer'

const bem = prefixer("Item")

export default React.createClass({
  render() {
    const mods = this.props.selected ? ["selected"] : []
  
    return (
      h(bem('div', mods), [    // expands to "div.Item.Item--selected"
        h(bem('h1#heading'), 'This is hyperscript'),    // expands to "h1.Item__heading"
        h(bem('div#body'), 'creating React.js markup'),  // expands to "div.Item__body"
      ])
    );
  }
});
```

## License

MIT
