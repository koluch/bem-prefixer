/**
 * Copyright (c) 2016 Nikolai Mavrenkov <koluch@koluch.ru>
 *
 * Distributed under the MIT License (See accompanying file LICENSE or copy at http://opensource.org/licenses/MIT).
 *
 * Created: 12.04.2016 19:58
 */

const parseSelector = (selector) => {
    const regexp = /^([^#\.]+)(?:#([^\.]+))?(?:\.(.+))?$/
    const match = selector.match(regexp)
    if (match === null) {
        throw new Error("Bad selector format: " + selector)
    }
    return {
        tag: match[1],
        element: match[2] || null,
        modifiers: match[3] ? match[3].split(".") : null,
    }
}

const buildBlockTag = (block, tag, mods) => {
    if (typeof block !== "string") throw Error("Block should be a string, given: " + JSON.stringify(block))
    if (typeof tag !== "string") throw Error("Tag should be a string, given: " + JSON.stringify(tag))
    if (mods === null) {
        mods = []
    }
    else if (typeof mods === "string") {
        mods = [mods]
    }
    if (Object.prototype.toString.call(mods) !== "[object Array]") {
        throw Error("Mods should be an array or string, given " + JSON.stringify(mods))
    }
    const modClasses = mods.map((mod) => `${block}--${mod}`)
    return [`${tag}.${block}`, ...modClasses].join(".")
}

const buildElementTag = (block, tag, el, mods) => {
    if (typeof block !== "string") throw Error("Block should be a string, given: " + JSON.stringify(block))
    if (typeof tag !== "string") throw Error("Tag should be a string, given: " + JSON.stringify(tag))
    if (typeof el !== "string") throw Error("Tag should be a string, given: " + JSON.stringify(el))
    if (mods === null) {
        mods = []
    }
    else if (typeof mods === "string") {
        mods = [mods]
    }
    else if (Object.prototype.toString.call(mods) !== "[object Array]") {
        throw Error("Mods should be an array or string, given " + JSON.stringify(mods))
    }
    const modClasses = mods.map((mod) => `${block}__${el}--${mod}`)
    return [`${tag}.${block}__${el}`, ...modClasses].join(".")
}


module.exports = (block) => (...args) => {
    const selector = args[0]
    const parsedSelector = parseSelector(selector)

    if (parsedSelector.element === null && parsedSelector.modifiers === null) {
        const tag = args[0]
        if (args.length === 1) {
            return buildBlockTag(block, tag, null)
        }
        else if (args.length === 2) {
            if (Array.isArray(args[1])) {
                const mods = args[1]
                return buildBlockTag(block, tag, mods)
            }
            else {
                const el = args[1]
                return buildElementTag(block, tag, el, [])
            }
        }
        else if (args.length === 3) {
            const el = args[1]
            const mods = args[2]
            return buildElementTag(block, tag, el, mods)
        }
        else {
            throw new Error("Wrong arguments number (minumum 1, maximum 3)")
        }
    }
    else {
        if (args.length > 1) {
            throw new Error("It's impossible to combine inline selectors with arguments!")
        }
        if (parsedSelector.element) {
            return buildElementTag(block, parsedSelector.tag, parsedSelector.element, parsedSelector.modifiers)
        }
        else {
            return buildBlockTag(block, parsedSelector.tag, parsedSelector.modifiers)
        }
    }
}
