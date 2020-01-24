import React from 'react'
import z from '@z1/lib-feature-box'
import { Button } from '@z1/lib-ui-box-elements'

// main
const baseProps = {
  as: 'div',
  shape: 'circle',
  fill: 'outline',
}
const circleSize = z.fn(t =>
  t.match({
    _: {
      width: '2.9rem',
      height: '2.9rem',
    },
    xs: {
      width: '2.3rem',
      height: '2.3rem',
    },
    sm: {
      width: '2.5rem',
      height: '2.5rem',
    },
    lg: {
      width: '3.25rem',
      height: '3.25rem',
    },
    xl: {
      width: '3.5rem',
      height: '3.5rem',
    },
  })
)
const renderAvatar = z.fn(t => props => {
  const src = t.pathOr(null, ['src'], props)
  const to = t.pathOr(null, ['to'], props)
  const onClick = t.pathOr(null, ['onClick'], props)
  const noLink = t.isNil(to)
  const noClick = t.isNil(onClick)
  const baseMode = t.and(noLink, noClick) ? 'inactive' : 'active'
  const mode = t.pathOr(baseMode, ['mode'], props)
  const nextProps = t.mergeAll([
    baseProps,
    t.omit(['src', 'style', 'to', 'onClick', 'mode'], props),
    { mode },
    noLink ? {} : { to },
    noClick ? {} : { onClick },
    t.isNil(src)
      ? {}
      : {
          bgSize: 'cover',
          style: t.mergeAll([
            { backgroundImage: `url("${src}")` },
            circleSize(props.size || 'md'),
            t.pathOr({}, ['style'], props),
          ]),
        },
  ])
  return <Button {...nextProps} />
})

export class Avatar extends React.Component {
  render() {
    return renderAvatar(this.props)
  }
}
Avatar.displayName = 'Avatar'
