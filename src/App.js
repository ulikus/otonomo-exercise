import React, { Component } from 'react'
import './App.css'
import EventNotification from './components/EventNotification'

import createRandomColor from './dom-utils/colors'
import Checkbox from './components/Checkbox'
import Input from './components/Input'
import Button from './components/Button'
import createCarStreamer from './api/car-data-streamer'

class App extends Component {
  fuelFilter = 0.15
  displayLimit = 10

  state = {
    carDataEvents: [],
    carVinCodes: [],
    vinColors: {},

    showAll: false,

    newVin: '',
    inputError: '',
  }

  updateState = carData => {
    let { carDataEvents, vinColors, showAll } = this.state
    if (carData.fuel < this.fuelFilter || showAll) {
      carDataEvents = carDataEvents.slice(0, this.displayLimit - 1) // we limit amount of visible events to some reasonable number avoid sluggish interface.
      carDataEvents.unshift({
        carEvent: carData,
        color: vinColors[carData.vin],
      })
    }
    this.setState({ carDataEvents })
  }

  validateVin = () => {
    let { newVin, vinColors } = this.state
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
    let { carVinCodes, newVin, vinColors } = this.state

    vinColors[newVin] = createRandomColor()

    let Vin = { vin: newVin }
    Vin.checked = true
    Vin.streamer = createCarStreamer(Vin.vin)
    Vin.streamer.subscribe(this.updateState)
    Vin.streamer.start()
    carVinCodes.push(Vin)

    this.setState({ carVinCodes, newVin: '', vinColors })
  }

  onSubmit = e => {
    e.preventDefault()
    if (this.validateVin()) {
      this.subscribeToVin()
    }
  }

  toggleListen = idx => {
    return e => {
      let carVinCodes = this.state.carVinCodes
      if (carVinCodes[idx].checked) {
        carVinCodes[idx].streamer.stop()
      } else {
        carVinCodes[idx].streamer.start()
      }
      carVinCodes[idx].checked = !carVinCodes[idx].checked
      this.setState({ carVinCodes })
    }
  }

  render() {
    const {
      vinColors,
      newVin,
      carVinCodes,
      showAll,
      carDataEvents,
      inputError,
    } = this.state

    return (
      <div className="App container">
        <div className="row">
          <div className="inputBlock col-sm-4">
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
          <div className="inputBlock col-sm-8">
            <Checkbox
              checked={!showAll}
              onChange={() => this.setState({ showAll: !showAll })}>
              Filter events where fuel level is under {this.fuelFilter * 100}%
            </Checkbox>
          </div>
        </div>
        <div className="row">
          <div className="inputBlock col-sm-4">
            <h3>Vin list</h3>
            <div className="vinList">
              {carVinCodes.map((Vin, idx) => (
                <Checkbox
                  key={`checkbox_${Vin.vin}`}
                  checked={Vin.checked}
                  onChange={this.toggleListen(idx)}>
                  <span style={{ color: vinColors[Vin.vin] }}>{Vin.vin}</span>
                </Checkbox>
              ))}
            </div>
          </div>
          <div className="inputBlock col-sm-8">
            <h3>Car events</h3>
            {carDataEvents.map(carData => (
              <EventNotification
                key={`${carData.carEvent.timestamp}_${carData.carEvent.vin}`}
                {...carData}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default App
