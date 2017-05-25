import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchUserExchanges} from '../../reducers/exchanges'

class Exchanges extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Exchanges</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return {
    exchanges: state.exchangeReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchanges)
