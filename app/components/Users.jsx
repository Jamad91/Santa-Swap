import React, {Component} from 'react';
import {connect} from 'react-redux';

class Users extends Component {
  render() {
    return (
      <div>
        <h1>Users</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Users)
