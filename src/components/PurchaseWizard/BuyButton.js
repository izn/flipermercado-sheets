import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class UserList extends Component {
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
      handleRestartWizard
    } = this.props

    const userFirstName = user.name.split(' ')[0]

    return (
      <div>
        <h3 className="text-center">
          <strong>{userFirstName}</strong>,
            você tem certeza que deseja comprar <strong>{product.name}</strong> por <strong>R${product.price}</strong>?
        </h3>

        <br />

        <Button variant="primary" size="lg" onClick={handlePurchaseClick} disabled={loadingPurchase} block>
          Comprar
        </Button>

        <Button variant="light" size="lg" onClick={handleRestartWizard} block>Cancelar</Button>
      </div>
    );
  }
}

export default UserList;
