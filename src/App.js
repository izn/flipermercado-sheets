import React, { Component } from 'react'
import { Container, Button } from 'react-bootstrap'

import config from './config'

import Logo from './components/Logo'
import PurchaseWizard from './components/PurchaseWizard'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { GAPIClient: false }

    this.initGAPIClient = this.initGAPIClient.bind(this)
  }

  componentDidMount() {
    this.loadGAPI()
  }

  loadGAPI() {
    const script = document.createElement('script')

    script.src = 'https://apis.google.com/js/api.js'
    script.onload = () => window.gapi.load('client:auth2', this.initGAPIClient)

    document.body.appendChild(script)
  }

  initGAPIClient() {
    const _this = this

    window.gapi.auth2.init({
      clientId: config.clientId,
      scope: config.scopes
    }).then(function (response) {
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(
        _this.updateSigninStatus
      );

      _this.updateSigninStatus(
        window.gapi.auth2.getAuthInstance().isSignedIn.get()
      );
    });
  }

  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      this.setState({ GAPIClient: window.gapi })
    } else {
      this.setState({ GAPIClient: false })
    }
  }

  handleClickGoogleAPISignIn() {
    window.gapi.auth2.getAuthInstance().signIn()
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
          <Button onClick={this.handleClickGoogleAPISignIn}>Google Login</Button>
        )}
      </Container>
    )
  }
}

export default App
