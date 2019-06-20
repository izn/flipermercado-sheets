import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

class UserList extends Component {
  componentDidMount() {
    // TODO: Please refactor. Sorry.
    document.body.style.backgroundColor = '#FFFFFF'
  }

  render() {
    const { selectUser, userList } = this.props

    return (
      <Form.Group>
        <label>Quem é você?</label>
        <Form.Control as="select" onChange={selectUser}>
          <option>[Selecione]</option>

          {userList.map((user, index) => (
            <option value={index}>
              {user.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    )
  }
}

export default UserList
