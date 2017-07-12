import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from 'APP/app/store'
import { Link } from 'react-router'

import User from '../User'
import {addPersonToExchange} from 'APP/app/reducers/exchanges'


class SingleExchange extends Component {

  constructor(props) {
    super(props);
    const names = [];
    this.state = {
      search: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.findMatches = this.findMatches.bind(this)
    // this.addUser = this.addUser.bind(this)
  }

  findMatches(wordToMatch, people, members) {
    return people.filter(person => {
      const regex = new RegExp(wordToMatch, 'gi')
      if (person.name.match(regex) && !members.includes(person.id)) {
        return person
      }
    })
  }


  handleChange(evt) {
    let newState = {}
    newState.search = evt.target.value;
    this.setState(newState)
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.state = {
      name: ""
    }
  }



  render() {
    let searchResults;
    this.state.search.length > 0
      ? searchResults = this.findMatches(this.state.search, this.props.users, this.props.exchange.members)
      : searchResults = ''

    console.log('members',this.props.exchange.members)

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
          </form>
            {
              searchResults.length > 0
                ? searchResults.map(person => <div key={person.id}>
                  <button
                    onClick={() => {
                      this.props.addPersonToExchange(person.id, this.props.exchange.id)
                      this.setState(() => {return {name: ""}})
                    }}
                  >{person.name} +</button></div>)
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
// addUser(personId, exchangeId) {
//   return () => {
//     store.dispatch(addPersonToExchange(personId,exchangeId))
//   }
// }

function mapDispatchToProps(dispatch) {
  return {
    addPersonToExchange: (personId, exchangeId) => {
      dispatch(addPersonToExchange(personId, exchangeId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleExchange)
