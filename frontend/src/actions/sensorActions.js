import axios from "axios"
import { SENSORDATA_REQUEST, SENSORDATA_SUCCESS, SENSORDATA_FAIL, SENSORDATA_LAST_TEMPERATURE_SUCCESS, SENSORDATA_LAST_TEMPERATURE_FAIL, SENSORDATA_LAST_TEMPERATURE_REQUEST } from "../constants/sensorConstants"

export const SensorHistoricalData = (deviceName, gateway) => async (dispatch) => {
  try {
    dispatch({ type: SENSORDATA_REQUEST })
    console.log("SensorHistoricalData: Gateway: " + gateway)
    if (gateway === undefined) gateway = localStorage.getItem("gateway")
    const { data } = await axios.get(`https://gapit-smart-react-dashboard-api.azurewebsites.net/api/GetDeviceHistory?device=${deviceName}&gateway=${gateway}`)

    dispatch({
      type: SENSORDATA_SUCCESS,
      payload: data,
    })
    localStorage.setItem("deviceName", deviceName)
    localStorage.setItem("gateway", gateway)
  } catch (error) {
    dispatch({
      type: SENSORDATA_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const SensorDataLastTemperature = (gateway) => async (dispatch) => {
  try {
    dispatch({ type: SENSORDATA_LAST_TEMPERATURE_REQUEST })

    const { data } = await axios.get(`https://gapit-smart-react-dashboard-api.azurewebsites.net/api/GetDeviceData?gateway=${gateway}`)
    //  const { data } = await axios.get(`https://cors-anywhere.herokuapp.com/http://localhost:7071/api/GetDeviceData?gateway=${gateway}`)
    dispatch({
      type: SENSORDATA_LAST_TEMPERATURE_SUCCESS,
      payload: data,
    })
    localStorage.setItem("gateway", gateway)
  } catch (error) {
    dispatch({
      type: SENSORDATA_LAST_TEMPERATURE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
