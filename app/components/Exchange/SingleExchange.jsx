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

    this.memberRemoval = this.memberRemoval.bind(this)
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

  render() {

    let exchange = this.props.exchange
    console.log(exchange);
    if (this.props.auth) {
      return (
        <div className="page-content">
          <div className="signedin-body">
            <SantaBox />
            <h1 className="header-font page-greeting">Manage {exchange.title}</h1>
            <div className="links">
              <h3 className="header-font">Due date: {exchange.dueDate}</h3>
              <Link href={`/exchanges/${exchange.id}/join`}>Join Form</Link><br />
              <Link href="/home">Home</Link>
            </div>
            <div className="main-content">
              <div className="content-box single-ex">
                <h1 className="header-font">Current attendees</h1>
                {
                  exchange.members && exchange.members.length > 0
                    ? exchange.members.map(member =>
                      <div className="listing" key={member.id}>
                        {member.firstName} {member.lastName}<br />
                        {member.phone}<br />
                        {member.email}<br />
                        {member.houseNum}<br />
                        {
                          member.apartment.length > 0
                          ? <span>{member.apartment}<br /></span> 
                          : null
                        }
                        {member.city}, {member.state} {member.zip}
                        {
                          this.props.auth && !exchange.sentList
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
                    : <div><h2 className="header-font">No members yet!</h2></div>
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
          <div id="denied-access">
            <img src="http://media.tumblr.com/3168ff7903ec0ede7b77c3ece227fa78/tumblr_inline_mw9vlaR79q1sp2a15.gif" />
            <h1 className="header-font">You don't have access to this page, please return to the <Link href="/home">homepage</Link></h1>
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
