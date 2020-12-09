import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Meta from "../components/Meta"
import { SensorDataLastTemperature, SensorHistoricalData } from "../actions/sensorActions"
import SensorChart from "../components/SensorChart"
import Gauge from "../components/Gauge"

const DashboardScreen = ({ match }) => {
  const dispatch = useDispatch()

  const lastTemparatureData = useSelector((state) => state.sensorDataLastTemperature)
  const { loading, error, sensorDataLastTemperature } = lastTemparatureData

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  var myData = []
  var deviceName = ""

  useEffect(() => {
    dispatch(SensorDataLastTemperature(userInfo.gateway))
  }, [dispatch, userInfo.gateway])

  useEffect(() => {
    if (deviceName !== "") dispatch(SensorHistoricalData(deviceName, userInfo.gateway))
  }, [dispatch, deviceName, userInfo.gateway])

  if (loading || loading === undefined) {
    return <Loader />
  } else {
    myData = JSON.stringify(sensorDataLastTemperature).split(",")
    deviceName = myData[0].split(":")[1].replace("{", "").replace('"', "").replace('"', "")

    dispatch(SensorHistoricalData(deviceName, userInfo.gateway))
  }

  return (
    <>
      <Meta />
      <h1>Dashboard {userInfo.name}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {<SensorChart deviceName={deviceName} gateway={userInfo.gateway} />}
          <Row>
            {sensorDataLastTemperature.map((device, index) => (
              <Col key={index} sm={12} md={6} lg={4} xl={3}>
                <Gauge device={device} gateway={userInfo.gateway} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default DashboardScreen
