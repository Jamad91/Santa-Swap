import React, {Component} from 'react';
import WhoAmI from './WhoAmI';
import {connect} from 'react-redux';
import CreateExchange from './Exchange/CreateExchange'
import Exchanges from './Exchange/Exchanges'

class Home extends Component {
  render() {
    return (
      <div>
        {
          this.props.user
            ? <div>
                <h1>Welcome, {this.props.user.name}, to Santa Swap!</h1>
                <Exchanges />
                <CreateExchange />
              </div>
            : <div>
                <h1>Welcome to Santa Swap!</h1>
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
