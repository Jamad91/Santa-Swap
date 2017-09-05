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
  let newArr = this.shuffle(arr.slice());
  let exchange = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id === newArr[i].id) {
      newArr = this.shuffle(newArr);
      i = -1;
      exchange = [];
    } else {
      exchange.push({ giver: arr[i], receiver: newArr[i] });
    }
  }
  console.log(exchange);
  return exchange;
}

  // goodMatch(el1, el2, arr) {
  //   for (var i = 0; i < arr.length; i++) {
  //
  //     if(arr[i].includes(el1) && arr[i].includes(el2)) {return false}
  //   }
  //   return true;
  // }

  shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
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
    console.log('this', this.props);
    console.log('check', this.state.list, this.props.users);
    let matchUps = this.matchMaker(this.props.members);
    console.log('matchUps',matchUps);
    return (
      <div>
        <button>Generate List</button><br />
        {
          matchUps.map(match =>
            <div key={match.giver.id}>
              <span>Giver: {match.giver.firstName}</span><br />
              <span>Receiver: {match.receiver.firstName}</span>
              <hr />
            </div>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(ExchangeList)
