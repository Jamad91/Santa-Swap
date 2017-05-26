import React, { Component } from 'react';
import {connect} from 'react-redux'

class Exchanges extends Component {

  render() {
    const exchanges = this.props.exchanges;
    console.log(this.props.user);

    return (
      <div>
        <h1>Exchanges</h1>
        {exchanges.map(exchange => {
          if (this.props.user.id === exchange.user_id) {
            return (
              <div key={exchange.id}>
                {exchange.title}
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
