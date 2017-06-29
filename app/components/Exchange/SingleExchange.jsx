import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from 'APP/app/store'
import { Link } from 'react-router'

import User from '../User'
import {fetchUsers, addPersonToExchange} from 'APP/app/reducers/users'


const onUsersEnter = function() {
  store.dispatch(fetchUsers())
}

function findMatches(wordToMatch, names) {
  return names.filter(name => {
    const regex = new RegExp(wordToMatch, 'gi')
    if (name.name.match(regex) && name.name.match(regex).length > 0) {
      return name
    }
  })
}

function displayMatches() {
  const matchArray = findMatches(this.value, this.props.users)
  const html = matchArray.map(person => {
    const regex = new RegExp(this.value, 'gi');
    const name = person.name.replace(regex, `<span className="hl">${this.value}</span>`)
    return `
      <li>
        <p>${name}</p>
      </li>
    `
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search')
const sugestions = document.querySelector('.suggestions')

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
    console.log('this state.search', this.state.search);
    console.log('all users:',this.props.users);

    // const searchResults = this.state..filter(name => {
    //   const regex = new RegExp(wordToMatch, 'gi')
    //   console.log('red',name.name.match(regex));
    //   return name.name.match(regex)
    // }

    let searchResults;
    this.state.search.length > 0
      ? searchResults = findMatches(this.state.search, this.props.users)
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
