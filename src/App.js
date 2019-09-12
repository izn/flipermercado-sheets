import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

import Logo from './components/Logo'
import PurchaseWizard from './components/PurchaseWizard'
import FakeAuth from './components/FakeAuth'

import config from './config'
import SyncPurchases from './components/SyncPurchases'

import sha256 from 'crypto-js/sha256'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { isAuthenticated: false }

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(passwd) {
    config.authPassword === sha256(passwd).toString() &&
      this.setState({ isAuthenticated: true })
  }

  render() {
    const isAuthenticated = this.state.isAuthenticated

    SyncPurchases.startJob();

    return (
      <Container>
        <Logo />
        {!isAuthenticated && <FakeAuth handleAuth={this.handleLogin}/>}
        {isAuthenticated && <PurchaseWizard />}
      </Container>
    )
  }
}

export default App
