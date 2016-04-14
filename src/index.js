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

const buildBlockTag = (prefix, tag, mods = []) => {
    mods = mods === null ? [] : mods
    const modClasses = mods.map((mod) => `${prefix}--${mod}`)
    return [`${tag}.${prefix}`, ...modClasses].join(".")
}

const buildElementTag = (prefix, tag, el, mods) => {
    mods = mods === null ? [] : mods
    const modClasses = mods.map((mod) => `${prefix}__${el}--${mod}`)
    return [`${tag}.${prefix}__${el}`, ...modClasses].join(".")
}

export default (prefix) => (...args) => {
    const selector = args[0]
    const parsedSelector = parseSelector(selector)

    if (parsedSelector.element === null && parsedSelector.modifiers === null) {
        //todo: check arguments format
        if (args.length === 1) {
            return args[0] + "." + prefix
        }
        else if (args.length === 2) {
            const tag = args[0]
            if (Array.isArray(args[1])) {
                const mods = args[1]
                return buildBlockTag(prefix, tag, mods)
            }
            else {
                const el = args[1]
                return buildElementTag(prefix, tag, el, [])
            }
        }
        else if (args.length === 3) {
            const tag = args[0]
            const el = args[1]
            const mods = args[2]

            return buildElementTag(prefix, tag, el, mods)
        }
        else {
            throw new Error("Wrong arguments number (max 3 allowed)")
        }
    }
    else {
        if (args.length > 1) {
            throw new Error("It's impossible to combine complex selectors with arguments!") //todo: make better message?
        }
        if (parsedSelector.element) {
            return buildElementTag(prefix, parsedSelector.tag, parsedSelector.element, parsedSelector.modifiers)
        }
        else {
            return buildBlockTag(prefix, parsedSelector.tag, parsedSelector.modifiers)
        }
    }
}
