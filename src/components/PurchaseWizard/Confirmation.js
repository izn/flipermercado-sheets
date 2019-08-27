import React, { Component } from 'react'
import { Button, Row, Col } from 'react-bootstrap'

import { parsePrice } from '../helpers'

import BuyButton from './BuyButton'

class Confirmation extends Component {
  componentDidMount() {
    // TODO: Please refactor. Sorry.
    document.body.style.backgroundColor = '#fbe2f0'
    window.scrollTo(0, 0)
  }

  render() {
    const {
      user,
      product,
      loadingPurchase,
      handlePurchaseClick,
      handleBackButton
    } = this.props

    const userFirstName = user.name.split(' ')[0]
    const parsedPrice = parsePrice(product.price)

    return (
      <>
        <h3 className='text-center mb-4'>
          <strong>{userFirstName}</strong>,
            você tem certeza que deseja comprar <strong>{product.name}</strong> por <strong>{parsedPrice}</strong>?
        </h3>

        <BuyButton
          handlePurchaseClick={handlePurchaseClick}
          loadingPurchase={loadingPurchase}
        />

        <Row className='mb-4'>
          <Col>
            <Button variant="light" size="lg" onClick={handleBackButton} block>Voltar</Button>
          </Col>
        </Row>
      </>
    );
  }
}

export default Confirmation
