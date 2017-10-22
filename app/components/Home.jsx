import React, {Component} from 'react';
import WhoAmI from './WhoAmI';
import {connect} from 'react-redux';
import { Link } from 'react-router'
import CreateExchange from './Exchange/CreateExchange'
import Exchanges from './Exchange/Exchanges'

import {fetchUserExchanges} from '../reducers/exchanges'

import store from '../store'

class Home extends Component {
  render() {
    return (
      <div className="page-content">
        {
          this.props.user
            ? <div>
                <h1 id="greeting">Welcome, {this.props.user.name}, to Santa Swap!</h1>
                <div className="main-content">
                  <Exchanges/>
                  <CreateExchange />
                </div>
              </div>
            : <div>
                <h1>Welcome to Santa Swap!</h1>
                <h2>Please log in!</h2>
              </div>
        }
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return ({
    user: state.auth
  })
}

export default connect(mapStateToProps)(Home)
