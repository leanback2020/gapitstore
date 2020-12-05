import axios from "axios"
import { SENSORDATA_REQUEST, SENSORDATA_SUCCESS, SENSORDATA_FAIL, SENSORDATA_LAST_TEMPERATURE_SUCCESS, SENSORDATA_LAST_TEMPERATURE_FAIL, SENSORDATA_LAST_TEMPERATURE_REQUEST } from "../constants/sensorConstants"

export const SensorHistoricalData = (deviceName) => async (dispatch) => {
  try {
    dispatch({ type: SENSORDATA_REQUEST })

    const { data } = await axios.get(`https://gapit-smart-react-dashboard-api.azurewebsites.net/api/GetDeviceHistory?device=${deviceName}`)

    dispatch({
      type: SENSORDATA_SUCCESS,
      payload: data,
    })
    localStorage.setItem("deviceName", deviceName)
  } catch (error) {
    dispatch({
      type: SENSORDATA_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const SensorDataLastTemperature = () => async (dispatch) => {
  try {
    dispatch({ type: SENSORDATA_LAST_TEMPERATURE_REQUEST })

    const { data } = await axios.get(`https://gapit-smart-react-dashboard-api.azurewebsites.net/api/GetDeviceData`)

    dispatch({
      type: SENSORDATA_LAST_TEMPERATURE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SENSORDATA_LAST_TEMPERATURE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
