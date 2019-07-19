import React, { Component } from 'react'
import { Card, CardDeck } from 'react-bootstrap'

import { parsePrice } from '../helpers'

class ProductListItems extends Component {
  render() {
    const { products, selectProduct } = this.props

    return (
      <CardDeck className='mb-4'>
        {products.map((product) => (
          <Card
            key={product.id}
            className="text-center"
            onClick={() => selectProduct(product.id)}
          >
            <Card.Header>
              {product.name}
            </Card.Header>
            <Card.Body>
              {parsePrice(product.price)}
            </Card.Body>
          </Card>
        ))}
      </CardDeck>
    )
  }
}

export default ProductListItems
