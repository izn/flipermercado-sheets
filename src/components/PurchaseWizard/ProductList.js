import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

class ProductList extends Component {
  componentDidMount() {
    // TODO: Please refactor. Sorry.
    document.body.style.backgroundColor = '#FFF9C4'
  }

  render() {
    const {
      selectProduct,
      handleRestartWizard,
      productList,
      user
    } = this.props

    return (
      <div>
        <h3 className="text-center">
          <strong>{user.name}</strong>
        </h3>

        <br />

        <Form.Group>
          <label>O que você deseja comprar?</label>
          <Form.Control as="select" onChange={selectProduct}>
            <option>[Selecione o Produto]</option>

            {productList.map((product, index) => (
              <option key={index} value={index}>
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
