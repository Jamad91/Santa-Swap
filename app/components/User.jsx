import React, {Component} from 'react';
import {connect} from 'react-redux';

class Users extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.user.name}</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state.userReducer);
  return {
    user: state.userReducer.selectedUser
  }
}

export default connect(mapStateToProps)(Users)
