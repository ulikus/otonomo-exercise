import VinForm from '../components/vin-blocks/VinForm'
import VinFilter from '../components/vin-blocks/VinFilter'
import VinList from '../components/vin-blocks/VinList'
import VinData from '../components/vin-blocks/VinData'
import React, { Component } from 'react'

class VinContainer extends Component {
  state = {
    carDataEvents: [],
    carVinCodes: [],
    vinColors: {},

    showAll: false,
  }

  updateVinCodes = ({ carVinCodes, vinColors }) => {
    this.setState({ carVinCodes, vinColors })
  }

  updateVinEvents = ({ carDataEvents }) => {
    this.setState({ carDataEvents })
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

  toggleFilter = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  render() {
    const { vinColors, carVinCodes, carDataEvents, showAll } = this.state

    return (
      <div className={'container'}>
        <div className="row">
          <VinForm
            className={'inputBlock col-sm-4'}
            updateVinCodes={this.updateVinCodes}
            updateVinEvents={this.updateVinEvents}
            vinColors={vinColors}
            carVinCodes={carVinCodes}
            carDataEvents={carDataEvents}
            showAll={showAll}
          />
          <VinFilter
            className={'inputBlock col-sm-8'}
            toggleFilter={this.toggleFilter}
            showAll={showAll}
          />
        </div>
        <div className="row">
          <VinList
            className={'inputBlock col-sm-4'}
            toggleListen={this.toggleListen}
            vinColors={vinColors}
            carVinCodes={carVinCodes}
          />
          <VinData
            className={'inputBlock col-sm-8'}
            carDataEvents={carDataEvents}
          />
        </div>
      </div>
    )
  }
}

export default VinContainer
