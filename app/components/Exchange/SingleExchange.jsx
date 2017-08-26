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
    // console.log(this.props);
    console.log(this.props.users);
    let searchResults;
    this.state.search.length > 0
      ? searchResults = this.findMatches(this.state.search, this.props.users, this.props.exchange.members)
      : searchResults = ''

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
                      this.setState(() => {
                        window.location.reload()
                        return {name: ""}
                      })
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
  console.log('single exchange',state);
  return {
    auth: state.auth,
    exchange: state.exchangeReducer.selectedExchange,
    users: state.userReducer.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPersonToExchange: (personId, exchangeId) => {
      dispatch(addPersonToExchange(personId, exchangeId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleExchange)

// let members = [
//   { id: 1, name: 'Jimmy' },
//   { id: 2, name: 'Joey' },
//   { id: 3, name: 'tiara' },
//   { id: 4, name: 'Katie' },
//   { id: 5, name: 'DiCo' },
//   { id: 6, name: 'Devon' },
//   { id: 7, name: 'Gary' },
//   { id: 8, name: 'Andrew' },
//   { id: 9, name: 'Matt' },
//   { id: 10, name: 'Mitalee' },
//   { id: 11, name: 'Hayley' },
// ];

// badMatches = [
//   [{ id: 9, name: 'Matt' }, { id: 10, name: 'Mitalee' }],
//   [
//     { id: 1, name: 'Jimmy' },
//     { id: 2, name: 'Joey' },
//     { id: 3, name: 'tiara' },
//     { id: 4, name: 'Katie' },
//     { id: 5, name: 'DiCo' },
//   ],
//   [{ id: 6, name: 'Devon' }, { id: 8, name: 'Andrew' }],
// ];

let memberIds = [1,2,3,4,5,6,7,8,9,10,11]

let badMatches = [[9,10],[1,2,3,4,5],[6,8]]
/*
function matchMaker(arr) {
  let newArr = shuffle(arr.slice());
  let exchange = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === newArr[i] && goodMatch(arr[i], newArr[i], badMatches)) {
      newArr = shuffle(newArr);
      i = -1;
      exchange = [];
    } else {
      exchange.push({ giver: arr[i], receiver: newArr[i] });
    }
  }
  return exchange;
}

function goodMatch(el1, el2, arr) {
  for (var i = 0; i < arr.length; i++) {

    if(arr[i].includes(el1) && arr[i].includes(el2)) {return false}
  }
  return true;
}

function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}
console.log(matchMaker(memberIds));
*/
