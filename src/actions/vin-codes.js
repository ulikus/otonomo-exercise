import {
  TOGGLE_FILTER,
  UPDATE_VIN_CODES,
  UPDATE_VIN_COLORS,
  UPDATE_VIN_EVENTS,
} from './actionTypes'

export function toggleFilter(showAll) {
  return {
    type: TOGGLE_FILTER,
    showAll,
  }
}

export function updateVinCodes(carVinCodes) {
  return {
    type: UPDATE_VIN_CODES,
    carVinCodes,
  }
}

export function updateVinColors(vinColors) {
  return {
    type: UPDATE_VIN_COLORS,
    vinColors,
  }
}

export function updateVinEvents(carDataEvents) {
  return {
    type: UPDATE_VIN_EVENTS,
    carDataEvents,
  }
}
