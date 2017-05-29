import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from 'APP/app/store'

import Users from '../Users'
import {fetchUsers} from 'APP/app/reducers/users'


const onUsersEnter = function() {
  store.dispatch(fetchUsers())
}

class SingleExchange extends Component {
  render() {
    console.log('exchange props',this.props);
    return (
      <div>
        <h1>{this.props.exchange.title}</h1>
          {
            this.props.users.map(user => {
              if (this.props.exchange.members.includes(user.id)) {
                return (<h3 key={user.id}>{user.name}</h3>)
              }
            })
          }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    exchange: state.exchangeReducer.selectedExchange,
    users: state.userReducer.users
  }
}

export default connect(mapStateToProps)(SingleExchange)
