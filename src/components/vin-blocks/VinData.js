import EventNotification from '../dom-elements/EventNotification'
import React from 'react'
import { connect } from 'react-redux'

function VinData({ className, children, ...props }) {
  const { carDataEvents } = props

  return (
    <div className={className}>
      <h3>Car events</h3>
      {carDataEvents.map(carData => (
        <EventNotification
          key={`${carData.carEvent.timestamp}_${carData.carEvent.vin}`}
          {...carData}
        />
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    carDataEvents: state.vinCodes && state.vinCodes.carDataEvents,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VinData)
