import {
  TOGGLE_FILTER,
  UPDATE_VIN_CODES,
  UPDATE_VIN_COLORS,
  UPDATE_VIN_EVENTS,
} from '../actions/actionTypes'
import { combineReducers } from 'redux'

const initialState = {
  showAll: false,
  carVinCodes: [],
  vinColors: {},
  carDataEvents: [],
}

function vinCodes(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FILTER:
      return Object.assign({}, state, {
        showAll: action.showAll,
      })
    case UPDATE_VIN_CODES:
      return Object.assign({}, state, {
        carVinCodes: [...action.carVinCodes], // need to trigger render. as it checks only for reference change.
      })
    case UPDATE_VIN_COLORS:
      return Object.assign({}, state, {
        vinColors: action.vinColors,
      })
    case UPDATE_VIN_EVENTS:
      return Object.assign({}, state, {
        carDataEvents: action.carDataEvents,
      })
    default:
      return state
  }
}

export default combineReducers({
  vinCodes,
})
