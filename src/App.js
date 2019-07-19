import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

import Logo from './components/Logo'
import PurchaseWizard from './components/PurchaseWizard'

class App extends Component {
  render() {
    return (
      <Container>
        <Logo />
        <PurchaseWizard />
      </Container>
    )
  }
}

export default App
