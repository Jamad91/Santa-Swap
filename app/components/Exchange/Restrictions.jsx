import React, {Component} from 'react'
import {connect} from 'react-redux'
import { restrictPair, unrestrictPair } from 'APP/app/reducers/exchanges'

class Restrictions extends Component {

  constructor(props) {
    super(props)

    this.state = {
      person1: 0,
      person2: 0
    }
    this.onSelectPerson = this.onSelectPerson.bind(this)
    this.onAddNew = this.onAddNew.bind(this)
    this.personFinder = this.personFinder.bind(this)
    this.deleteRestriction = this.deleteRestriction.bind(this)
    this.goodMatch = this.goodMatch.bind(this)
  }

  onSelectPerson(e) {
    let newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  onAddNew(e) {
    let newRestriction = [parseInt(this.state.person1), parseInt(this.state.person2)]
    this.props.restrictPair(this.props.exchange.id, newRestriction)
    // window.location.reload();
  }

  deleteRestriction(e) {
    this.props.unrestrictPair(this.props.exchange.id, e.target.id.split('-'));
    window.location.reload();
  }

  personFinder(id) {
    return this.props.exchange.members.filter(member => {if (id === member.id) { return member}})[0]
  }

  goodMatch(arr, id1, id2) {
    if (arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][0] == id1 && arr[i][1] == id2 || arr[i][0] == id2 && arr[i][1] == id1) {
          alert('Restriction already exists')
          return false
        }
      }
    }
    return true
  }

  render() {

    return (
      <div id="restrictions">
        <h1 className="header-font">Restrictions</h1>
        {
          this.props.exchange.restrictions && this.props.exchange.restrictions.length > 0
          ? this.props.exchange.restrictions.map(restriction =>
            <div className="listing" key={`${this.personFinder(restriction[0]).id}-${this.personFinder(restriction[1]).id}`}>{this.personFinder(restriction[0]).firstName} {this.personFinder(restriction[0]).lastName} &  {this.personFinder(restriction[1]).firstName} {this.personFinder(restriction[1]).lastName}<div className="delete-btn restriction-delete" onClick={this.deleteRestriction} id={`${this.personFinder(restriction[0]).id}-${this.personFinder(restriction[1]).id}`}>Delete</div></div>
          )
          : <h2 className="header-font">No Restrictions Made Yet!</h2>
        }

        <form>
          <h2 className="header-font">Add a new restriction</h2>
            <div className="form-input">
              Person 1: <select name="person1" onChange={this.onSelectPerson}>
                <option value="0" checked>----------------------</option>
                {this.props.exchange.members
                  ? this.props.exchange.members.map(member =>
                      <option key={`select-one${member.id}`} value={member.id}>{member.firstName} {member.lastName}</option>
                    )
                  : null
                }
              </select><br />
            Person 2: <select name="person2" onChange={this.onSelectPerson}>

                <option value="0" checked>----------------------</option>
                {this.props.exchange.members
                  ? this.props.exchange.members.map(member =>
                    <option key={`select-two${member.id}`} value={member.id}>{member.firstName} {member.lastName}</option>
                  )
                  : null
                }
              </select><br />
            {
              this.state.person1 === 0 || this.state.person2 === 0 || this.state.person1 === this.state.person2 || !this.goodMatch(this.props.exchange.restrictions, this.state.person1, this.state.person2)
              ? <button className="restrict-btn" id="cant-click">Add</button>
              : <button className="restrict-btn" onClick={this.onAddNew}>Add</button>
            }
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    exchange: state.exchangeReducer.selectedExchange
  }
}

function mapDispatchToProps(dispatch) {
  return {
    restrictPair: () => {
      dispatch(restrictPair)
    },
    unrestrictPair: () => {
      dispatch(unrestrictPair)
    }
  }
}

export default connect(mapStateToProps, {restrictPair, unrestrictPair})(Restrictions)
