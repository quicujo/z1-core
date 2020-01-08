import React from 'react'
import { fn } from '@z1/lib-ui-box'

// elements
import { Box } from './Box'

// main
const renderSpacer = fn(t => props =>
  React.createElement(
    Box,
    t.merge(t.omit(['box'], props), {
      box: t.merge({ flex: 1 }, t.pathOr({}, ['box'], props)),
    })
  )
)

export class Spacer extends React.Component {
  render() {
    return renderSpacer(this.props)
  }
}
