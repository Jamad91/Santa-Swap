import React, {Component} from 'react';
import {connect} from 'react-redux';

class Users extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.user.name}</h1>
        <h3>Email: {this.props.user.email}</h3>
        <h3>Phone Number: {this.props.user.phone}</h3>
        <h3>Address</h3>
        <h3>{this.props.user.address1}</h3>
        <h3>{this.props.user.address2}</h3>
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
