import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from 'APP/app/store'
import { Link } from 'react-router'
import {removeMember} from 'APP/app/reducers/exchanges'
import ExchangeList from './ExchangeList'

class SingleExchange extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userIncluded: false,
      madeList: false
    }

    if (this.props.list) {
      this.setState({madeList: true})
    }

    this.makeList = this.makeList.bind(this)
  }

  makeList() {
    // if (this.props.user)

    console.log('making list');
    this.setState({madeList: true})
  }

  render() {
    let exchange = this.props.exchange
    return (
      <div>
        <h1>{this.props.exchange.title}</h1>
        <p>Current attendees</p>
        {
          exchange.members
            ? exchange.members.map(member =>
              <div key={member.id}>
                {member.firstName} {member.lastName}
                {
                  this.props.auth
                    ? <span onClick={() => {
                        window.location.reload()
                        this.props.removeMember(exchange.id, member.id)
                      }
                    }>X</span>
                  : null
                }

              </div>
            )
            : null
        }
        {
          exchange.list
          ? <ExchangeList members={exchange.members}/>
          : null
        }

        <Link href={`/exchanges/${exchange.id}/join`}>Join Link</Link><br />
        <Link href="/home">Home</Link>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    exchange: state.exchangeReducer.selectedExchange
  }
}

export default connect(mapStateToProps, {removeMember})(SingleExchange)
