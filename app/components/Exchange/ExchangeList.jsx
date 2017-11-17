import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from 'APP/app/store'
import { makeList } from 'APP/app/reducers/exchanges'

class ExchangeList extends Component {
  constructor(props) {
    super(props)

    this.state = {list: [], hidden: true}

    this.matchMaker = this.matchMaker.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.toggleHidden = this.toggleHidden.bind(this)
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
      if (givers[i].id === receivers[i].id || (restrictObject[givers[i].id] && restrictObject[givers[i].id].includes(receivers[i].id))) {
        receivers = this.shuffle(receivers);
        i = -1;
        exchange = [];
      } else {
        exchange.push({ giver: givers[i], receiver: receivers[i] });
      }
    }


    // this.setState({
    //   list: exchange
    // })
    this.props.makeList(this.props.exchange.id, exchange);
    window.location.reload();
    // return exchange
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

  render() {
    return (
      <div>
        <h1 className="header-font">List</h1 >
        {
          this.props.exchange.list.length === 0
            ? <div>
                <h2 className="header-font">No list made yet!</h2>
                <div onClick={() => this.matchMaker(this.props.members, this.props.exchange.restrictions)}>Make List</div>
              </div>
            : <div>
                <h2>List Made!</h2>
              </div>
        }
        {
          this.state.hidden
            ? <div className="toggle-btn" onClick={() => this.toggleHidden()}>See it!</div>
            : <div>
                <div className="toggle-btn" onClick={()=>this.toggleHidden()}>Hide list!</div><br /><br /><br />
                {this.props.exchange.list.map(match =>
                  <div key={match.giver.id}>
                    <div className="list-entry">
                      <span>Giver: {match.giver.firstName} {match.giver.lastName}</span><br />
                      <span>Receiver: {match.receiver.firstName} {match.receiver.lastName}</span>
                    </div>
                    <hr />
                  </div>
                )}
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

export default connect(mapStateToProps, {makeList})(ExchangeList)
