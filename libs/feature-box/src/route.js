import React from 'react'
import { fn } from '@z1/lib-state-box'
export { NOT_FOUND } from 'redux-first-router'

// main
export const route = fn(t => ({
  render(actionType, routes) {
    const matchedDef = t.find(
      routeDef =>
        t.gt(
          t.findIndex(
            action => t.eq(actionType, action),
            t.isType(routeDef.action, 'Array')
              ? routeDef.action
              : [routeDef.action]
          ),
          -1
        ),
      routes
    )
    if (!matchedDef.ui) {
      return null
    }
    return React.createElement(matchedDef.ui, { key: actionType })
  },
  notFound: NOT_FOUND,
  actions(box) {
    return t.keys(t.pathOr({}, ['routes'], box))
  },
}))
