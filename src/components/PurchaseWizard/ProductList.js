import React, { Component } from 'react'
import { Button, Row, Col } from 'react-bootstrap'

import ProductListItems from './ProductListItems'

class ProductList extends Component {
  componentDidMount() {
    // TODO: Please refactor. Sorry.
    document.body.style.backgroundColor = '#FFF9C4'
  }

  render() {
    const {
      selectProduct,
      handleBackButton,
      productList,
      user
    } = this.props

    return (
      <>
        <h3 className='text-center mb-4'>
          <strong>{user.name}</strong>
        </h3>

        <h4 className='mb-4'>O que você deseja comprar?</h4>

        {productList.map((products, index) => (
          <ProductListItems key={index} products={products} selectProduct={selectProduct} />
        ))}

        <Row className='mb-4'>
          <Col>
            <Button variant="light" size="lg" onClick={handleBackButton} block>Voltar</Button>
          </Col>
        </Row>
      </>
    )
  }
}

export default ProductList
