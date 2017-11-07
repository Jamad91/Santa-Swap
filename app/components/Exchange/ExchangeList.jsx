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

  matchMaker(givers, restrictions) {
    console.log(givers);
    let receivers = this.shuffle(givers.slice());
    let exchange = [];
    let restrictObject = {}
    console.log('restrictions',restrictions);

    for (var i = 0; i < restrictions.length; i++) {
      console.log(Object.keys(restrictObject));
      if (Object.keys(restrictObject).includes(restrictions[i][0])) {
        restrictObject[restrictions[i][0]].push(restrictions[i][1])
      } else {
        restrictObject[restrictions[i][0]] = [restrictions[i][1]]
      }
      if (Object.keys(restrictObject).includes(restrictions[i][1])) {
        restrictObject[restrictions[i][1]].push(restrictions[i][0])
      } else {
        restrictObject[restrictions[i][1]] = [restrictions[i][0]]
      }

    }

    console.log('restrictObject',restrictObject);
    for (var i = 0; i < givers.length; i++) {
      console.log('fiver eye',restrictObject[givers[i].id])
      if (givers[i].id === receivers[i].id) {
        console.log('same match');
        receivers = this.shuffle(receivers);
        i = -1;
        exchange = [];
      } else if (restrictObject[givers[i].id] && restrictObject[givers[i].id].includes(receivers[i].id)) {
        console.log('restricted match');
        receivers = this.shuffle(receivers);
        i = -1;
        exchange = [];
      } else {
        exchange.push({ giver: givers[i], receiver: receivers[i] });
      }
    }


    // this.setState({
    //   list: exchange
    // })
    this.props.makeList(this.props.exchange.id, exchange);
    return exchange
    // window.location.reload();
  }

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
            ? <div onClick={() => this.matchMaker(this.props.members, this.props.exchange.restrictions)}>Make List</div>
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
