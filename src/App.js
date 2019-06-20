import React, { Component } from 'react'
import { Container, Button } from 'react-bootstrap'

import GoogleAPI from './helpers/google-api'

import Logo from './components/Logo'
import PurchaseWizard from './components/PurchaseWizard'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { GAPIClient: false }
  }

  componentDidMount() {
    GoogleAPI.init(() => this.setState({ GAPIClient: window.gapi }))
  }

  render() {
    return (
      <Container>
        <Logo />

        {this.state.GAPIClient && (
          <PurchaseWizard
            GAPIClient={this.state.GAPIClient} />
        )}

        {!this.state.GAPIClient && (
          <Button onClick={GoogleAPI.signInAction} block>Login with Google</Button>
        )}
      </Container>
    )
  }
}

export default App
