import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {removeExchange} from 'APP/app/reducers/exchanges';

class Exchanges extends Component {

  constructor(props) {
    super(props)

    this.removeExchange = this.removeExchange.bind(this)
  }

  removeExchange(id) {
    console.log(id);
    this.props.removeExchange(id)
  }

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
                <span>
                  <div style={{marginTop: '-5%', width: '15%'}} className="delete-btn" onClick={() =>{
                    this.props.removeExchange(exchange.id)
                    window.location.reload()
                  }}>Delete</div>

                  </span>
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

export default connect(mapStateToProps, {removeExchange})(Exchanges)
