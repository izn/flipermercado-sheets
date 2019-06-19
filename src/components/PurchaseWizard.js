import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'

import config from '../config'

import UserList from './PurchaseWizard/UserList'
import ProductList from './PurchaseWizard/ProductList'
import BuyButton from './PurchaseWizard/BuyButton'

class PurchaseWizard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userList: [],
      productList: [],
    }

    this.selectUser = this.selectUser.bind(this)
    this.selectProduct = this.selectProduct.bind(this)
    this.confirmPurchase = this.confirmPurchase.bind(this)
    this.restartWizard = this.restartWizard.bind(this)
  }

  selectUser(event) {
    let foundUser = this.state.userList[event.target.value]

    this.setState({ user: foundUser })
  }

  selectProduct(event) {
    let foundProduct = this.state.productList[event.target.value]

    this.setState({ product: foundProduct })
  }

  restartWizard() {
    this.setState({
      user: null,
      product: null,
      loadingPurchase: false,
      transactionCompleted: false
    })
  }

  loadUsers = () => {
    const { GAPIClient } = this.props

    GAPIClient.client.load('sheets', 'v4', () => {
      GAPIClient.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: config.spreadsheetId,
          range: 'Flipers'
        })
        .then(
          response => {
            const data = response.result.values
            const users = data.map(user => ({
              name: user[0],
            })) || []

            this.setState({ userList: users })
          }
        )
      })
  }

  loadProducts = () => {
    const { GAPIClient } = this.props

    GAPIClient.client.load('sheets', 'v4', () => {
      GAPIClient.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: config.spreadsheetId,
          range: 'Products'
        })
        .then(
          response => {
            const data = response.result.values
            const products = data.map(product => ({
              name: product[0],
              price: product[1]
            }))

            this.setState({ productList: products })
          }
        )
    })
  }

  confirmPurchase = () => {
    const { GAPIClient } = this.props
    const { user, product } = this.state

    this.setState({ loadingPurchase: true })

    GAPIClient.client.load('sheets', 'v4', () => {
      GAPIClient.client.sheets.spreadsheets.values
        .append({
          spreadsheetId: config.spreadsheetId,
          range: 'Transactions',
          insertDataOption: 'INSERT_ROWS',
          valueInputOption: 'USER_ENTERED',
          resource: {
            'majorDimension': 'ROWS',
            'values': [[
              new Date().toUTCString(),
              user.name,
              product.name,
              product.price
            ]]
          },
        })
        .then(
          response => {
            this.setState({
              loadingPurchase: false,
              transactionCompleted: true
            })

            setTimeout(() => {
              this.restartWizard()
            }, 4000)
          }
        );
    });
  }

  componentDidMount() {
    this.loadUsers()
    this.loadProducts()
  }

  render() {
    const { user, product, transactionCompleted } = this.state

    return (
      <Row>
        <Col md={12}>
        {!user && (
          <UserList
            userList={this.state.userList}
            selectUser={this.selectUser} />
        )}

        {user && !product && (
          <ProductList
            productList={this.state.productList}
            selectProduct={this.selectProduct}
            handleRestartWizard={this.restartWizard}
            user={user} />
        )}

        {user && product && !transactionCompleted && (
          <BuyButton
            user={user}
            product={product}
            loadingPurchase={this.state.loadingPurchase}
            handlePurchaseClick={this.confirmPurchase}
            handleRestartWizard={this.restartWizard} />
        )}

        {transactionCompleted && (
          <div>
            <h3 className="text-center">Obrigado!</h3>
          </div>
        )}
        </Col>
      </Row>
    )
  }
}

export default PurchaseWizard
