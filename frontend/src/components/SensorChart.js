import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "./Loader"
import Message from "./Message"
import Chart from "react-apexcharts"
import { SensorHistoricalData } from "../actions/sensorActions"

const SensorChart = ({ deviceName }) => {
  const dispatch = useDispatch()
  var myData = {}
  const histSensorData = useSelector((state) => state.sensorData)
  const { loading, error, sensorData } = histSensorData
  deviceName = localStorage.getItem("deviceName")
  useEffect(() => {
    if (deviceName == "") deviceName = "LHT65-Device-01"
    dispatch(SensorHistoricalData(deviceName))
  }, [dispatch])

  if (!loading) {
    myData = {
      animations: {
        dynamicAnimation: {
          enabled: true,
          speed: 450,
        },
      },
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          type: "datetime",
          labels: {
            format: "dd MMM yyyy",
          },
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return value + "°C"
            },
          },
        },
        tooltip: {
          x: {
            format: "dd.MM.yyyy HH:mm",
          },
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: deviceName,
          align: "left",
        },
        subtitle: {
          text: "UF 1.10",
          align: "left",
        },
      },
      series: [
        {
          name: "Temperature",
          data: sensorData,
        },
      ],
    }
  }
  return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : <Chart options={myData.options} series={myData.series} type="area" height="400" />
}

export default SensorChart
