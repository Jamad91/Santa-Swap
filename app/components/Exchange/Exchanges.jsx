import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

class Exchanges extends Component {

  render() {
    const exchanges = this.props.exchanges;
    return (
      <div className="content-box" id="managing">
        <h1 className="header-font">Exchanges I'm managing</h1>
        {exchanges.map(exchange => {
          if (this.props.user.id === exchange.owner_id) {
            return (
              <div key={`${exchange.title}`} className="listing">
                <Link href={`/exchanges/${exchange.id}`} style={{ textDecoration: 'none' }}>
                  <div>
                    <h2 className="header-font">{exchange.title}</h2>
                    <p className="exchange-info">Members: {exchange.members.length}</p>
                    {}
                    <p className="exchange-info">List Made: {exchange.list && exchange.list.length > 0 ? <span>Yes</span> : <span>No</span>}
                    </p>
                  </div>
                </Link>
              </div>
            )
          }}
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
