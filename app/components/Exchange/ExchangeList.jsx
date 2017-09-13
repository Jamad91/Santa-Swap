import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from 'APP/app/store'
import { makeList } from 'APP/app/reducers/exchanges'

class ExchangeList extends Component {
  constructor(props) {
    super(props)

    this.state = {list: []}

    this.matchMaker = this.matchMaker.bind(this)
    this.shuffle = this.shuffle.bind(this)
  }

  componentWillUpdate() {
    this.props.exchange.list.length > 0
  }

  matchMaker(arr) {
    console.log(arr);
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
    // this.setState({
    //   list: exchange
    // })
    this.props.makeList(this.props.exchange.id, exchange);
    // return exchange
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

  render() {
    console.log('this', this.props);
    console.log('list',this.props.exchange.list, 'members',this.props.members);

    return (
      <div>
        <h3>List</h3>
        {
          this.props.exchange.list.length === 0
            ? <div onClick={() => this.matchMaker(this.props.members)}>Make List</div>
            : null
        }
        {
          this.props.exchange.list.map(match =>
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
    exchange: state.exchangeReducer.selectedExchange
  }
}

export default connect(mapStateToProps, {makeList})(ExchangeList)
