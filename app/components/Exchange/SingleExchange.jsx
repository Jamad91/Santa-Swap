import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from 'APP/app/store'
import { Link } from 'react-router'

import User from '../User'
import {fetchUsers, addPersonToExchange} from 'APP/app/reducers/users'


const onUsersEnter = function() {
  store.dispatch(fetchUsers())
}


class SingleExchange extends Component {

  constructor(props) {
    super(props);
    const names = [];
    this.state = {
      name: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    let newState = {}
    newState[evt.target.name] = evt.target.value;

    this.setState(newState)
  }

  handleSubmit(evt) {
    console.log('this state', this.state);
    evt.preventDefault();

    this.props.addPersonToExchange(this.state)
    this.state = {
      name: ""
    }
  }

  findMatches(wordToMatch, names) {
    return names.filter(name => {
      const regex = new RegExp(wordToMatch, 'gi')
      return name.match(regex)
    })
  }


  render() {
    return (
      <div>
        <h1>{this.props.exchange.title}</h1>
          {
            this.props.users.map(user => {
              if (this.props.exchange.members && this.props.exchange.members.includes(user.id)) {
                return (
                  <h3 key={user.id}><Link href={`/users/${user.id}`}>{user.name}</Link></h3>
                )
              }
            })
          }
          <h2>Add people</h2>
          <form>
            <input placeholder="Name" />
            <br />
            <button onClick={this.handleSubmit}>Add+</button>
          </form>
          <button>Generate List</button><br />
          <Link href="/home">Home</Link>
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
