import Checkbox from '../dom-elements/Checkbox'
import React from 'react'

export default function VinList({ className, children, ...props }) {
  const { vinColors, carVinCodes, toggleListen } = props

  return (
    <div className={className}>
      <h3>Vin list</h3>
      <div className="vinList">
        {carVinCodes.map((Vin, idx) => (
          <Checkbox
            key={`checkbox_${Vin.vin}`}
            checked={Vin.checked}
            onChange={toggleListen(idx)}>
            <span style={{ color: vinColors[Vin.vin] }}>{Vin.vin}</span>
          </Checkbox>
        ))}
      </div>
    </div>
  )
}
