import React, {Component} from 'react';
import {connect} from 'react-redux';

class Users extends Component {
  render() {
    let user = this.props.user
    console.log('user', user);
    return (
      <div>
        <h1>{user.name}</h1>
        <h3>Email: {user.email}</h3>
        <h3>Phone Number: {user.phone}</h3>
        <h3>Address</h3>
        <h3>{user.houseNum}</h3>
        <h3>{user.apartment}</h3>
        <h3>{user.city}, {user.state} {user.zip}</h3>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.selectedUser
  }
}

export default connect(mapStateToProps)(Users)
