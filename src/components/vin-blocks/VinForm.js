import Input from '../dom-elements/Input'
import Button from '../dom-elements/Button'
import React, { Component } from 'react'
import createRandomColor from '../../dom-utils/colors'
import createCarStreamer from '../../api/car-data-streamer'
import config from '../../config/defaults'

class VinForm extends Component {
  state = {
    newVin: '',
    inputError: '',
  }

  updateState = carData => {
    let { carDataEvents, vinColors, showAll } = this.props
    if (carData.fuel < config.fuelFilter || showAll) {
      carDataEvents = carDataEvents.slice(0, config.displayLimit - 1) // we limit amount of visible events to some reasonable number avoid sluggish interface.
      carDataEvents.unshift({
        carEvent: carData,
        color: vinColors[carData.vin],
      })
    }
    this.props.updateVinEvents({ carDataEvents })
  }

  validateVin = () => {
    let { newVin } = this.state
    let { vinColors } = this.props
    this.setState({ inputError: '' })

    const vinTest = /^[A-Z\d]{17}$/
    if (!vinTest.test(newVin)) {
      this.setState({ inputError: 'VIN is invalid' })
      return false
    }
    if (vinColors[newVin]) {
      this.setState({ inputError: 'VIN is already in list.' })
      return false
    }
    return true
  }

  subscribeToVin = () => {
    let { carVinCodes, vinColors } = this.props
    let { newVin } = this.state

    vinColors[newVin] = createRandomColor()

    let Vin = { vin: newVin }
    Vin.checked = true
    Vin.streamer = createCarStreamer(Vin.vin)
    Vin.streamer.subscribe(this.updateState)
    Vin.streamer.start()
    carVinCodes.push(Vin)

    // return carVinCodes
    // vinColors
    this.props.updateVinCodes({ carVinCodes, vinColors })
    this.setState({ newVin: '' })
  }

  onSubmit = e => {
    e.preventDefault()
    if (this.validateVin()) {
      this.subscribeToVin()
    }
  }

  render() {
    const { newVin, inputError } = this.state

    return (
      <div className={this.props.className}>
        <form onSubmit={this.onSubmit}>
          <Input
            className="vinInput"
            placeholder={'Enter VIN'}
            value={newVin}
            onChange={event =>
              this.setState({ newVin: event.target.value.toUpperCase() })
            }
          />
          <Button>+ ADD</Button>
          <span className="errorBlock">{inputError}</span>
        </form>
      </div>
    )
  }
}
export default VinForm
