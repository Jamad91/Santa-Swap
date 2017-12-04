import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from 'APP/app/store'
import { makeList, sendList, contactPerson } from 'APP/app/reducers/exchanges'

class ExchangeList extends Component {
  constructor(props) {
    super(props)

    this.state = {list: [], hidden: true, sentList: false}

    this.matchMaker = this.matchMaker.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.toggleHidden = this.toggleHidden.bind(this)
    this.sentList = this.sentList.bind(this)
  }

  componentWillUpdate() {
    this.props.exchange.list.length > 0
  }

  matchMaker(givers, restrictions) {
    let receivers = this.shuffle(givers.slice());
    let exchange = [];
    let restrictObject = {}

    for (var i = 0; i < restrictions.length; i++) {
      if (Object.keys(restrictObject).includes(restrictions[i][0])) {
        restrictObject[restrictions[i][0]].push(restrictions[i][1])
      } else {
        restrictObject[restrictions[i][0]] = [restrictions[i][1]]
      }
      if (Object.keys(restrictObject).includes(restrictions[i][1])) {
        restrictObject[restrictions[i][1]].push(restrictions[i][0])
      } else {
        restrictObject[restrictions[i][1]] = [restrictions[i][0]]
      }

    }

    for (var i = 0; i < givers.length; i++) {

      if (givers[i].id === receivers[i].id || (restrictObject[givers[i].id] && restrictObject[givers[i].id].includes(receivers[i].id)) || (restrictObject[receivers[i].id] && restrictObject[receivers[i].id].includes(givers[i].id))) {
        receivers = this.shuffle(receivers);
        i = -1;
        exchange = [];
      } else {
        exchange.push({ giver: givers[i], receiver: receivers[i] });
      }
    }

    this.props.makeList(this.props.exchange.id, exchange);
    window.location.reload();
  }

  shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  }

  toggleHidden() {
    let bool = this.state.hidden
    this.setState({hidden: !bool})
  }

  sentList(list) {
    this.setState({sentList: true})
    this.props.sendList(this.props.exchange.id, list)
    window.location.reload();
  }

  render() {
    let exchange = this.props.exchange
    return (
      <div>
        <h1 className="header-font">List</h1 >
        {
          exchange.list.length === 0
            ? <div>
                <h2 className="header-font">No list made yet!</h2>
                <div className="make-list-btn" onClick={() => this.matchMaker(this.props.members, exchange.restrictions)}>Make List</div>
              </div>
            : <div>

                  {
                    exchange.sentList || this.state.sentList
                      ? <div>
                          <h2>List Made And Sent!</h2>
                        </div>
                      : <div style={{display: 'block'}}>
                          <h2>List Made But Not Sent!</h2>
                          <div style={{display: 'block'}} className="make-list-btn" onClick={() => this.matchMaker(this.props.members, exchange.restrictions)}>New List?</div><br /><br /><br />
                          <div className="make-list-btn" id="send-list-btn" onClick={() => this.sentList(exchange.list) }><p>Send List</p></div>
                        </div>
                  }
                  <div style={{marginTop: '35%'}}>
                    {
                      this.state.hidden
                      ? <div className="toggle-btn" onClick={() => this.toggleHidden()}>See it!</div>
                      : <div>
                          <div className="toggle-btn" onClick={()=>this.toggleHidden()}>Hide list!</div><br /><br /><br />
                            {exchange.list.map(match =>
                              <div key={match.giver.id}>
                                <div className="list-entry">
                                  <span>Giver: {match.giver.firstName} {match.giver.lastName}</span><br />
                                  <span>Receiver: {match.receiver.firstName} {match.receiver.lastName}</span>
                                  <div className="restrict-btn" style={{width: '15%', fontSize: '100%'}} onClick={() => {
                                    alert(`Contacted ${match.giver.firstName} ${match.giver.lastName}!`)
                                    this.props.contactPerson(exchange.id, match)
                                  }}>Contact Giver</div>
                                </div>
                                <hr />
                              </div>
                            )}
                        </div>
                    }
                  </div>
              </div>
        }

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    exchange: state.exchangeReducer.selectedExchange
  }
}

export default connect(mapStateToProps, {makeList, sendList, contactPerson})(ExchangeList)
