import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import {removeMember } from 'APP/app/reducers/exchanges'
import ExchangeList from './ExchangeList'
import Restrictions from './Restrictions'
import SantaBox from '../SantaBox'

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

    this.memberRemoval = this.memberRemoval.bind(this)
    this.makeList = this.makeList.bind(this)
  }

  memberRemoval(exchangeId, memberId) {
    let exchange = this.props.exchange
    let restrictions = exchange.restrictions
    let beingRestricted = false;
    for(var i = 0; !beingRestricted && i < restrictions.length; i++) {
      if (restrictions[i][0] === memberId || restrictions[i][1] === memberId) {
        beingRestricted = true
      }
    }
    if (beingRestricted) {
      let member = exchange.members.filter(member => memberId == member.id)[0]
      alert(`Remove any restrictions that ${member.firstName} ${member.lastName} is in first before removing them from exchange!`)
    }
    else {
      this.props.removeMember(exchangeId, memberId)
    }

  }

  makeList() {
    this.setState({madeList: true})
  }

  render() {

    let exchange = this.props.exchange

    if (this.props.auth) {
      return (
        <div className="page-content">
          <div className="signedin-body">
            <SantaBox />
            <h1 className="header-font page-greeting">Manage {this.props.exchange.title}</h1>
            <div>

              <Link href={`/exchanges/${exchange.id}/join`}>Join Link</Link><br />
              <Link href="/home">Home</Link>
            </div>
            <div className="main-content">
              <div className="content-box single-ex">
                <h1 className="header-font">Current attendees</h1>
                {
                  exchange.members
                    ? exchange.members.map(member =>
                      <div className="listing" key={member.id}>
                        {member.firstName} {member.lastName}
                        {
                          this.props.auth
                            ?
                              <span>
                                <div className="delete-btn"onClick={() => {
                                this.memberRemoval(exchange.id, member.id)
                                window.location.reload()
                              }}>Delete</div>

                              </span>
                          : null
                        }

                      </div>
                    )
                    : null
                }
              </div>
              <div className="content-box single-ex">
                <Restrictions />
              </div>

              <div className="content-box single-ex">
                {
                  exchange.list
                  ? <ExchangeList members={exchange.members} />
                  : null
                }

              </div>
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
