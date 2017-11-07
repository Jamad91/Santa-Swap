import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import {removeMember } from 'APP/app/reducers/exchanges'
import ExchangeList from './ExchangeList'
import Restrictions from './Restrictions'

class SingleExchange extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userIncluded: false,
      madeList: false,
    }

    if (this.props.list) {
      this.setState({madeList: true})
    }

    this.makeList = this.makeList.bind(this)
  }


  makeList() {
    this.setState({madeList: true})
  }

  render() {

    let exchange = this.props.exchange

    if (this.props.auth) {
      return (
        <div className="page-content">
          <div className="main-content">
            <div>

              <h1>Manage {this.props.exchange.title}</h1>
              <p>Current attendees</p>
              {
                exchange.members
                  ? exchange.members.map(member =>
                    <div key={member.id}>
                      {member.firstName} {member.lastName}
                      {
                        this.props.auth
                          ?
                            <span>
                              <div onClick={() => {
                              window.location.reload()
                              this.props.removeMember(exchange.id, member.id)
                            }}>Delete</div>

                            </span>
                        : null
                      }

                    </div>
                  )
                  : null
              }

              <Restrictions />

              {
                exchange.list
                ? <ExchangeList members={exchange.members} />
                : null
              }

              <Link href={`/exchanges/${exchange.id}/join`}>Join Link</Link><br />
              <Link href="/home">Home</Link>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="page-content">
          <div className="main-content">
            <p>You don't have access to this page, please return to the homepage!</p>
            <Link href="/home">Home</Link>
          </div>
        </div>
      )
    }
  }

}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    exchange: state.exchangeReducer.selectedExchange
  }
}

export default connect(mapStateToProps, {removeMember})(SingleExchange)
