import React, { Component } from 'react'
import { Form, ListGroup } from 'react-bootstrap'

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
        <ListGroup>
        {userList.map((user, index) => (
          <ListGroup.Item onClick={() => selectUser(user.id)} key={user.id}>
            {user.name}
          </ListGroup.Item>
        ))}
        </ListGroup>
      </Form.Group>
    )
  }
}

export default UserList
