import React from "react"
import { useSelector } from "react-redux"
import Loader from "./Loader"
import Message from "./Message"
import Chart from "react-apexcharts"

const SensorChart = () => {
  var myData = {}
  const histSensorData = useSelector((state) => state.sensorData)
  const { loading, error, sensorData } = histSensorData

  if (!loading) {
    myData = {
      animations: {
        dynamicAnimation: {
          enabled: true,
          speed: 450,
        },
      },
      options: {
        annotations: {
          yaxis: [
            {
              y: 70,
              borderColor: "#FF4560",
              label: {
                borderColor: "#FF4560",
                style: {
                  color: "#fff",
                  background: "#FF4560",
                },
                text: "Alarm Grense",
              },
            },
          ],
        },
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
          text: "deviceName",
          align: "left",
        },
        subtitle: {
          text: "UF ",
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
  return loading ? (
    <div height="400">
      {" "}
      <Loader />{" "}
    </div>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Chart options={myData.options} series={myData.series} type="area" height="400" />
    </>
  )
}

export default SensorChart
