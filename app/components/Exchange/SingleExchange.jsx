import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from 'APP/app/store'
import { Link } from 'react-router'

import User from '../User'
import {fetchUsers, addPersonToExchange} from 'APP/app/reducers/users'


const onUsersEnter = function() {
  store.dispatch(fetchUsers())
}

function findMatches(wordToMatch, people, members) {
  return people.filter(person => {
    const regex = new RegExp(wordToMatch, 'gi')
    if (person.name.match(regex) && !members.includes(person.id)) {
      return person
    }
  })
}

class SingleExchange extends Component {

  constructor(props) {
    super(props);
    const names = [];
    this.state = {
      search: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    let newState = {}
    newState.search = evt.target.value;
    this.setState(newState)
  }

  handleSubmit(evt) {
    evt.preventDefault();

    // this.props.addPersonToExchange(this.state)
    this.state = {
      name: ""
    }
  }



  render() {

    console.log('this state', this.state);
    console.log('all users:',this.props.exchange.members);

    let searchResults;
    this.state.search.length > 0
      ? searchResults = findMatches(this.state.search, this.props.users, this.props.exchange.members)
      : searchResults = ''
    console.log('searchResults',searchResults);


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
            <input placeholder="Name" className="search" onChange={this.handleChange}/>
            <br />
            <button onClick={this.handleSubmit}>Add+</button>
          </form>
            {
              searchResults.length > 0
                ? searchResults.map(person => <div key={person.id}>{person.name}</div>)
                : null
            }
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
