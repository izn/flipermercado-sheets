import React, { Component } from 'react'
import { Button, Spinner } from 'react-bootstrap'

class BuyButton extends Component {
  componentDidMount() {
    // TODO: Please refactor. Sorry.
    document.body.style.backgroundColor = '#FFCCBC'
  }

  render() {
    const { loadingPurchase, handlePurchaseClick, handleBackButton } = this.props

    return (
      <>
        {loadingPurchase && (
        <div class='text-center'>
          <Spinner
            animation='grow'
            size='lg'
            variant='dark'
            role='status'
            aria-hidden='true'
          />
        </div>
        )}

        {!loadingPurchase && (
        <>
          <Button variant="primary" size="lg" onClick={handlePurchaseClick} block>
            Comprar
          </Button>

          <Button variant="light" size="lg" onClick={handleBackButton} block>Voltar</Button>
        </>
        )}
      </>
    )
  }
}

export default BuyButton
