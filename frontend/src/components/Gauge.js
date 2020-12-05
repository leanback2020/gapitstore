import React from "react"
import { useDispatch } from "react-redux"
import { Card, Button } from "react-bootstrap"
import GaugeChart from "react-gauge-chart"
import { SensorHistoricalData } from "../actions/sensorActions"

const Gauge = ({ device }) => {
  const dispatch = useDispatch()
  device = device.replace('"', "").replace('"', "").replace('"', "").replace('"', "").replace("{", "").replace("}", "")
  var deviceInfo = device.toString().split(":")
  var temperature = parseFloat(deviceInfo[1] / 100)

  const chartStyle = {
    width: 200,
    height: 100,
  }

  const showGraphHandler = (e) => {
    console.log(deviceInfo[0])
    localStorage.setItem("deviceName", deviceInfo[0])
    dispatch(SensorHistoricalData(deviceInfo[0]))
  }

  return (
    <Card className="my-3 p-3 rounded">
      <div align="center">
        <Card.Title style={{ alignContent: "center" }} as="div">
          {deviceInfo[0] + " " + typeof temperature}
        </Card.Title>
      </div>
      <Card.Body>
        <GaugeChart id="gauge-chart5" style={chartStyle} cornerRadius={6} formatTextValue={(value) => value + "°C"} textColor={"#333333"} nrOfLevels={30} colors={["#5BE12C", "#F5CD19", "#EA4228"]} percent={temperature} marginInPercent={0.05} arcPadding={0.03} arcWidth={0.3} />
        <div align="center">
          <Button variant="outline-success" size="sm" className="p-2" onClick={showGraphHandler}>
            Show Graph
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Gauge
