import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import YouTube from "react-youtube"
import Product from "../components/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Paginate from "../components/Paginate"
import ProductCarousel from "../components/ProductCarousel"
import Meta from "../components/Meta"
import { listProducts } from "../actions/productActions"

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const opts = {
    width: "100%",
    height: "600",
  }
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  function onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }

  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <YouTube videoId="gAT2neau2no" opts={opts} onReady={onReady} />
          <ProductCarousel />
        </>
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Siste Produkter</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
        </>
      )}
    </>
  )
}

export default HomeScreen
