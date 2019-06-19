import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'

import logo from '../logo.svg'

class Logo extends Component {
  render() {
    return (
      <Row>
        <Col md={12} className="text-center">
          <img src={logo} alt="Logo" className="logo" width="300px" />
        </Col>
      </Row>
    )
  }
}

export default Logo
