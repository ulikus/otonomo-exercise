import Checkbox from '../dom-elements/Checkbox'
import React from 'react'
import config from '../../config/defaults'
import { connect } from 'react-redux'
import { toggleFilter } from '../../actions/vin-codes'

function VinFilter({ className, children, ...props }) {
  const { showAll, onToggle } = props
  return (
    <div className={className}>
      <Checkbox checked={!showAll} onChange={() => onToggle(!showAll)}>
        Filter events where fuel level is under {config.fuelFilter * 100}%
      </Checkbox>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    showAll: state.vinCodes && state.vinCodes.showAll,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onToggle: value => {
      dispatch(toggleFilter(value))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VinFilter)
