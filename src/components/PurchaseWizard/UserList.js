import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'

class UserList extends Component {
  render() {
    const { selectUser, userList } = this.props

    return (
      <ListGroup>
        {userList.map((user, index) => (
          <ListGroup.Item
            key={index}
            data-id={index}
            onClick={selectUser}
            action
          >
            {user.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  }
}

export default UserList
