import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

class Exchanges extends Component {

  render() {
    const exchanges = this.props.exchanges;
    return (
      <div className="content-box" id="managing">
        <h2>Exchanges I'm managing</h2>
        {exchanges.map(exchange =>
          <div key={`${exchange.title}`}>
            <Link href={`/exchanges/${exchange.id}`}>{exchange.title}</Link>
          </div>
        )}
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

export default connect(mapStateToProps)(Exchanges)
