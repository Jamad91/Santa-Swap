import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from 'APP/app/store'

class ExchangeList extends Component {
  constructor(props) {
    super(props)

    this.state = {list: []}

    this.matchMaker = this.matchMaker.bind(this)
    this.shuffle = this.shuffle.bind(this)
  }

  componentWillReceiveProps(props) {
    this.matchMaker(props.members)
  }

  matchMaker(arr) {
    let newArr
    arr
      ? newArr = this.shuffle(arr.slice())
      : newArr = []
    let exchange = [];
    for (var i = 0; i < newArr.length; i++) {
      if (arr[i] === newArr[i]) {
        newArr = this.shuffle(newArr);
        i = -1;
        exchange = [];
      } else {
        exchange.push({ giver: arr[i], receiver: newArr[i] });
      }
    }
    this.setState({
      list: exchange
    })
    return exchange;
  }

  goodMatch(el1, el2, arr) {
    for (var i = 0; i < arr.length; i++) {
      if(arr[i].includes(el1) && arr[i].includes(el2)) {return false}
    }
    return true;
  }

  shuffle(arr) {
    for (let i = arr.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
    }
    return arr;
  }

  displayPeople(idArr, memberArr) {
    let peopleList = [];
    for (let i = 0; i < idArr.length; i++) {
      let current = {giver: null, receiver: null};
      let idx = 0;
      while (!current.giver || !current.receiver) {
        if (!current.giver && idArr[i].giver === memberArr[idx].id) {
          current.giver = memberArr[idx]
        }
        if (!current.receiver && idArr[i].receiver === memberArr[idx].id) {
          current.receiver = memberArr[idx]
        }
        idx++
      }
      peopleList.push(current)
    }
    return peopleList;
  }

  render() {
    let matchUps = this.displayPeople(this.state.list, this.props.users);
    return (
      <div>
        <button>Generate List</button><br />
        {
          matchUps.map(match =>
            <div key={match.giver.name}>
              <span>Giver: {match.giver.name}</span><br />
              <span>Receiver: {match.receiver.name}</span>
              <hr />
            </div>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return {
    // auth: state.auth,
    // exchange: state.exchangeReducer.selectedExchange,
    users: state.userReducer.users
  }
}

export default connect(mapStateToProps)(ExchangeList)

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

// let memberIds = [1,2,3,4,5,6,7,8,9,10,11]

// let badMatches = [[9,10],[1,2,3,4,5],[6,8]]
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
