import React, { Component } from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'

class FakeAuth extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ password: event.target.value })
  }

  render() {
    const { handleAuth } = this.props

    return (
      <Row>
        <Col md={12}>
          <Form.Control type="password" onChange={this.handleChange} />

          <Button
            variant="primary"
            type="submit"
            size="lg"
            onClick={() => handleAuth(this.state.password)}
            block
          >
            Enviar
          </Button>
         </Col>
      </Row>
    )
  }
}

export default FakeAuth
