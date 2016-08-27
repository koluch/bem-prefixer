/**
 * Copyright (c) 2016 Nikolai Mavrenkov <koluch@koluch.ru>
 *
 * Distributed under the MIT License (See accompanying file LICENSE or copy at http://opensource.org/licenses/MIT).
 *
 * Created: 12.04.2016 20:08
 */

import test from "tape"
import prefixer from "../lib/index"

test("block only", (t) => {
    const bem = prefixer("BlockName")
    const result = bem("div")
    t.equals(result, "div.BlockName")
    t.end()
})

test("two arguments call, when second is a string, should return element", (t) => {
    const bem = prefixer("BlockName")
    const result = bem("div", "header")
    t.equals(result, "div.BlockName__header")
    t.end()
})

test("two arguments call, when second is an array, should return block with modifiers", (t) => {
    const bem = prefixer("BlockName")
    t.equals(bem("div", ["selected"]), "div.BlockName.BlockName--selected")
    t.equals(bem("div", []), "div.BlockName")
    t.equals(bem("div", ["selected", "highlighted"]), "div.BlockName.BlockName--selected.BlockName--highlighted")
    t.end()
})

test("three arguments should return element with modifiers", (t) => {
    const bem = prefixer("BlockName")
    t.equals(bem("div", "header", ["selected"]), "div.BlockName__header.BlockName__header--selected")
    t.equals(bem("div", "header", ["m1", "m2"]), "div.BlockName__header.BlockName__header--m1.BlockName__header--m2")
    t.end()
})

test("three arguments: third parameters could be a string", (t) => {
    const bem = prefixer("BlockName")
    t.equals(bem("div", "header", "selected"), "div.BlockName__header.BlockName__header--selected")
    t.end()
})

test("inline: element without modifiers", (t) => {
    const bem = prefixer("BlockName")
    t.equals(bem("div#header"), "div.BlockName__header")
    t.end()
})

test("inline: element with modifiers", (t) => {
    const bem = prefixer("BlockName")
    t.equals(bem("div#header.selected"), "div.BlockName__header.BlockName__header--selected")
    t.equals(bem("div#header.m1.m2"), "div.BlockName__header.BlockName__header--m1.BlockName__header--m2")
    t.end()
})

test("inline: block with modifiers", (t) => {
    const bem = prefixer("BlockName")
    t.equals(bem("div.highlighted.selected"), "div.BlockName.BlockName--highlighted.BlockName--selected")
    t.end()
})
