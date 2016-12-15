import jsdom from 'jsdom'
import noop from 'lodash/noop'
import constant from 'lodash/constant'

global.window = jsdom.jsdom().defaultView
global.navigator = window.navigator
window.document.createRange = constant(
  {
    setEnd: noop,
    setStart: noop,
    getBoundingClientRect: constant({}),
    getClientRects: constant({})
  })
global.document = window.document
