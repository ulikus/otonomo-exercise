import Checkbox from '../dom-elements/Checkbox'
import React from 'react'
import { updateVinCodes } from '../../actions/vin-codes'
import { connect } from 'react-redux'

function VinList({ className, children, ...props }) {
  const { vinColors, carVinCodes, updateVinCodes } = props

  const toggleListen = idx => {
    if (carVinCodes[idx].checked) {
      carVinCodes[idx].streamer.stop()
    } else {
      carVinCodes[idx].streamer.start()
    }
    carVinCodes[idx].checked = !carVinCodes[idx].checked
    updateVinCodes(carVinCodes)
  }

  return (
    <div className={className}>
      <h3>Vin list</h3>
      <div className="vinList">
        {carVinCodes.map((Vin, idx) => (
          <Checkbox
            key={`checkbox_${Vin.vin}`}
            checked={Vin.checked}
            onChange={e => toggleListen(idx)}>
            <span style={{ color: vinColors[Vin.vin] }}>{Vin.vin}</span>
          </Checkbox>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    vinColors: state.vinCodes && state.vinCodes.vinColors,
    carVinCodes: state.vinCodes && state.vinCodes.carVinCodes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateVinCodes: value => {
      dispatch(updateVinCodes(value))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VinList)
