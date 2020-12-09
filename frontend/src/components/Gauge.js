import React from "react"
import { useDispatch } from "react-redux"
import { Card, Button } from "react-bootstrap"
import { Droplet } from "react-bootstrap-icons"
import GaugeChart from "react-gauge-chart"
import { SensorHistoricalData } from "../actions/sensorActions"

const Gauge = ({ device, gateway }) => {
  const dispatch = useDispatch()

  var temperature = parseFloat(device.Temperature)
  temperature = temperature / 100
  const chartStyle = {
    width: 200,
    height: 100,
  }

  const showGraphHandler = (e) => {
    localStorage.setItem("deviceName", device.DeviceName)
    localStorage.setItem("gateway", gateway)
    dispatch(SensorHistoricalData(device.DeviceName, gateway))
  }

  return (
    <Card className="my-3 p-3 rounded">
      <div align="center">
        <Card.Title>{device.DeviceAlias}</Card.Title>
      </div>
      <Card.Body>
        <div align="center">
          {device.Temperature === "327.67" ? (
            <div>
              <p>Device Communication Error! Please Check Sensor Probe.</p>
              <br />{" "}
            </div>
          ) : (
            <>
              <GaugeChart id="gauge-chart5" style={chartStyle} cornerRadius={6} formatTextValue={(value) => value + "°C"} textColor={"#333333"} nrOfLevels={30} colors={["#5BE12C", "#F5CD19", "#EA4228"]} percent={temperature} marginInPercent={0.05} arcPadding={0.03} arcWidth={0.3} />
              <Button variant="outline-success" size="sm" className="p-2" onClick={showGraphHandler}>
                Show Graph
              </Button>
            </>
          )}
          <Droplet className="ml-4" color="royalblue" />
          {device.Humidity}%
        </div>
      </Card.Body>
      <Card.Footer>
        <div align="center" style={{ fontSize: 10 }}>
          EUI: {device.DeviceEUI}
        </div>
      </Card.Footer>
    </Card>
  )
}

export default Gauge
