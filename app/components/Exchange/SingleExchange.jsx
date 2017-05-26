import React, {Component} from 'react'
import {connect} from 'react-redux'

class SingleExchange extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.exchange.title}</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state',state);
  return {
    exchange: state.exchangeReducer.selectedExchange
  }
}

export default connect(mapStateToProps)(SingleExchange)
