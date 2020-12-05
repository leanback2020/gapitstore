import { SENSORDATA_REQUEST, SENSORDATA_SUCCESS, SENSORDATA_FAIL, SENSORDATA_LAST_TEMPERATURE_REQUEST, SENSORDATA_LAST_TEMPERATURE_SUCCESS, SENSORDATA_LAST_TEMPERATURE_FAIL } from "../constants/sensorConstants"

export const sensorDataReducer = (state = { sensorData: [] }, action) => {
  switch (action.type) {
    case SENSORDATA_REQUEST:
      return { loading: true, sensorData: [] }
    case SENSORDATA_SUCCESS:
      return {
        loading: false,
        sensorData: action.payload,
      }
    case SENSORDATA_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const sensorDataLastTemperatureReducer = (state = { sensorDataLastTemperature: [] }, action) => {
  switch (action.type) {
    case SENSORDATA_LAST_TEMPERATURE_REQUEST:
      return { loading: true, sensorDataLastTemperature: [] }
    case SENSORDATA_LAST_TEMPERATURE_SUCCESS:
      return {
        loading: false,
        sensorDataLastTemperature: action.payload,
      }
    case SENSORDATA_LAST_TEMPERATURE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
