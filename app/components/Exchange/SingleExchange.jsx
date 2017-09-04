import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from 'APP/app/store'
import { Link } from 'react-router'
import {addPersonToExchange} from 'APP/app/reducers/exchanges'
import ExchangeList from './ExchangeList'



class SingleExchange extends Component {

  render() {
    let exchange = this.props.exchange
    console.log(exchange);
    return (
      <div>
        <h1>{this.props.exchange.title}</h1>
        <p>Current attendees</p>
        {
          exchange.members
            ? exchange.members.map(member =>
              <div key={member.id}>{member.firstName} {member.lastName}</div>
            )
            : null
        }
        <Link href={`/exchanges/${exchange.id}/join`}>Join</Link><br />
        <Link href="/home">Home</Link>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    exchange: state.exchangeReducer.selectedExchange
  }
}

export default connect(mapStateToProps)(SingleExchange)
