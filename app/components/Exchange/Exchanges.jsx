import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

class Exchanges extends Component {

  render() {
    const exchanges = this.props.exchanges;
    return (
      <div>
        <h2>Manage Exchanges By You</h2>
        {exchanges.map(exchange => {
          if (this.props.user.id === exchange.owner_id) {
            return (
              <div key={`${exchange.id}byme`}>
                <Link href={`/exchanges/${exchange.id}`}>{exchange.title}</Link>
              </div>
            )
          }
        })}
        <h2>Check out Exchanges You're in</h2>
        {exchanges.map(exchange => {
          if (exchange.members.includes(this.props.user.id)) {
            return (
              <div key={`${exchange.id}in`}>
                <Link href={`/exchanges/${exchange.id}`}>{exchange.title}</Link>
              </div>
            )
          }
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    exchanges: state.exchangeReducer.exchanges,
    user: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchanges)
