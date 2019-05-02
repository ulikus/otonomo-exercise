import Checkbox from '../dom-elements/Checkbox'
import React from 'react'
import config from '../../config/defaults'

export default function VinFilter({ className, children, ...props }) {
  const { showAll, toggleFilter } = props

  return (
    <div className={className}>
      <Checkbox checked={!showAll} onChange={toggleFilter}>
        Filter events where fuel level is under {config.fuelFilter * 100}%
      </Checkbox>
    </div>
  )
}
