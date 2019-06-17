import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'

class ProductList extends Component {
  render() {
    const { selectProduct, productList } = this.props

    return (
      <ListGroup>
        {productList.map((product, index) => (
          <ListGroup.Item
            key={index}
            data-id={index}
            onClick={selectProduct}
            action
          >
            {product.name} (R${product.price})
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  }
}

export default ProductList
