import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

class Exchanges extends Component {

  render() {
    const exchanges = this.props.exchanges;
    console.log(exchanges);
    return (
      <div className="content-box" id="managing">
        <h2>Exchanges I'm managing</h2>
        {exchanges.map(exchange =>
          <div key={`${exchange.title}`} className="exchange-listing">
            <Link href={`/exchanges/${exchange.id}`} style={{ textDecoration: 'none' }}>
              <div>
                <h3>{exchange.title}</h3>
                <p>Members: {exchange.members.length}</p>
                <p>List Made: {exchange.list.length > 0 ? <span>Yes</span> : <span>No</span>}
                </p>
              </div>
            </Link>
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
