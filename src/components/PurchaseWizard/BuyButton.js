import React, { Component } from 'react'
import { Button, Spinner } from 'react-bootstrap'

class BuyButton extends Component {
  componentDidMount() {
    // TODO: Please refactor. Sorry.
    document.body.style.backgroundColor = '#FFCCBC'
  }

  render() {
    const { loadingPurchase, handlePurchaseClick } = this.props

    return (
      <>
        {loadingPurchase && (
        <div className='text-center'>
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
          <Button variant="primary" size="lg" onClick={handlePurchaseClick} block>
            Comprar
          </Button>
        )}
      </>
    )
  }
}

export default BuyButton
