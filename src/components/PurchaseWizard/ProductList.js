import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

class ProductList extends Component {
  render() {
    const {
      selectProduct,
      handleRestartWizard,
      productList,
      user
    } = this.props

    const userFirstName = user.name.split(' ')[0]

    return (
      <div>
        <Form.Group>
          <label>Oi, {userFirstName}! O que você deseja comprar?</label>
          <Form.Control as="select" onChange={selectProduct}>
            <option>[Selecione]</option>

            {productList.map((product, index) => (
              <option value={index}>
                {product.name} (R${product.price})
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Button variant="light" size="lg" onClick={handleRestartWizard} block>Cancelar</Button>
        </Form.Group>
      </div>
    )
  }
}

export default ProductList
