import cn from 'classnames'
import React from 'react'
import './Button.scss'

export default function Button({ className, children, ...props }) {
  return (
    <button {...props} className={cn(className, 'button')}>
      {children}
    </button>
  )
}
