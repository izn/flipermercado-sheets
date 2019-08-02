import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'

import axios from 'axios'
import { chunk, flatten } from 'lodash'

import config from '../config'
import { currentDate } from './helpers'

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

  selectUser(userId) {
    let foundUser = this.state.userList.find(user => user.id === userId)

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

  loadUsers = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: config.googleScriptURL + '?action=list_users',
        data: {},
        headers: {
          'Content-Type': 'text/plain',
        },
      })

      const data = response.data
      const users = data.map((user, index) => ({
        id: index,
        name: user[0],
      })) || []

      this.setState({ userList: users })
    } catch (error) {}
  }

  loadProducts = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: config.googleScriptURL + '?action=list_products',
        data: {},
        headers: {
          'Content-Type': 'text/plain',
        },
      })

      const data = response.data
      const products = data.map((product, index) => ({
        id: index,
        name: product[0],
        price: product[1]
      }))

      this.setState({ productList: chunk(products, 2) })
    } catch (error) {}
  }

  confirmPurchase = async () => {
    const { user, product } = this.state

    this.setState({ loadingPurchase: true })

    try {
      await axios({
        method: 'post',
        url: config.googleScriptURL + '?action=create_transaction',
        data: {
          created_at: currentDate(),
          user: user.name,
          product: product.name,
          price: product.price,
        },
        headers: {
          'Content-Type': 'text/plain',
        },
      })
    } catch (error) {}

    this.setState({
      loadingPurchase: false,
      transactionCompleted: true
    })

    setTimeout(() => {
      this.restartWizard()
    }, 4000)
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
