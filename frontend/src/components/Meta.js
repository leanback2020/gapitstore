import React from "react"
import { Helmet } from "react-helmet"

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: "Gapit Smart ",
  description: "We add security to your business",
  keywords: "IoT, IoT Sensor, Gapit Smart",
}

export default Meta
