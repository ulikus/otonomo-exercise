import VinForm from '../components/vin-blocks/VinForm'
import VinFilter from '../components/vin-blocks/VinFilter'
import VinList from '../components/vin-blocks/VinList'
import VinData from '../components/vin-blocks/VinData'
import React, { Component } from 'react'

class VinContainer extends Component {
  render() {
    return (
      <div className={'container'}>
        <div className="row">
          <VinForm className={'inputBlock col-sm-4'} />
          <VinFilter className={'inputBlock col-sm-8'} />
        </div>
        <div className="row">
          <VinList className={'inputBlock col-sm-4'} />
          <VinData className={'inputBlock col-sm-8'} />
        </div>
      </div>
    )
  }
}

export default VinContainer
