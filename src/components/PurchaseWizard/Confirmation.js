import React, { Component } from 'react'

import BuyButton from './BuyButton'

class Confirmation extends Component {
  componentDidMount() {
    // TODO: Please refactor. Sorry.
    document.body.style.backgroundColor = '#FFCCBC'
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

    return (
      <>
        <h3 className='text-center mb-4'>
          <strong>{userFirstName}</strong>,
            você tem certeza que deseja comprar <strong>{product.name}</strong> por <strong>R${product.price}</strong>?
        </h3>

        <BuyButton
          handlePurchaseClick={handlePurchaseClick}
          handleBackButton={handleBackButton}
          loadingPurchase={loadingPurchase}
        />
      </>
    );
  }
}

export default Confirmation
