import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'

import { chunk, flatten } from 'lodash'

import config from '../config'

import UserList from './PurchaseWizard/UserList'
import ProductList from './PurchaseWizard/ProductList'
import Confirmation from './PurchaseWizard/Confirmation'

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

    this.clearSelectedUser = this.clearSelectedUser.bind(this)
    this.clearSelectedProduct = this.clearSelectedProduct.bind(this)
    this.restartWizard = this.restartWizard.bind(this)
  }

  selectUser(event) {
    let userId = parseInt(event.target.value)
    let foundUser = this.state.userList.find(user => user.id === userId)

    console.log(userId)
    console.log(foundUser)

    this.setState({ user: foundUser })
  }

  selectProduct(productId) {
    let foundProduct = flatten(
      this.state.productList
    ).find(product => product.id === productId)

    this.setState({ product: foundProduct })
  }

  restartWizard() {
    this.clearSelectedUser()
    this.clearSelectedProduct()

    this.setState({ loadingPurchase: false, transactionCompleted: false })
  }

  clearSelectedUser() {
    this.setState({ user: null })
  }

  clearSelectedProduct() {
    this.setState({ product: null })
  }

  loadUsers = () => {
    const { GAPIClient } = this.props

    GAPIClient.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: config.spreadsheetNamedRanges.userList,
      })
      .then(
        response => {
          const data = response.result.values
          const users = data.map((user, index) => ({
            id: index,
            name: user[0],
          })) || []

          this.setState({ userList: users })
        }
      )
  }

  loadProducts = () => {
    const { GAPIClient } = this.props

    GAPIClient.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: config.spreadsheetNamedRanges.productList,
      })
      .then(
        response => {
          const data = response.result.values
          const products = data.map((product, index) => ({
            id: index,
            name: product[0],
            price: product[1]
          }))

          this.setState({ productList: chunk(products, 2) })
        }
      )
  }

  confirmPurchase = () => {
    const { GAPIClient } = this.props
    const { user, product } = this.state

    this.setState({ loadingPurchase: true })

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
      )
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
            handleBackButton={this.clearSelectedUser}
            user={user} />
        )}

        {user && product && !transactionCompleted && (
          <Confirmation
            user={user}
            product={product}
            loadingPurchase={this.state.loadingPurchase}
            handlePurchaseClick={this.confirmPurchase}
            handleBackButton={this.clearSelectedProduct} />
        )}

        {transactionCompleted && (
          <div className="text-center">
            <h3>Obrigado!</h3>
            <p>E não se esqueça de marcar sua compra no papel também!</p>
          </div>
        )}
        </Col>
      </Row>
    )
  }
}

export default PurchaseWizard
