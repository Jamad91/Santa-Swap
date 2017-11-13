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
    window.location.reload();
  }

  deleteRestriction(e) {
    this.props.unrestrictPair(this.props.exchange.id, e.target.id.split('-'));
    window.location.reload();
  }

  personFinder(id) {
    return this.props.exchange.members.filter(member => {if (id === member.id) { return member}})[0]
  }

  goodMatch(arr, id1, id2) {

    for (var i = 0; i < arr.length; i++) {
      if ((arr[i][0] === id1 && arr[i][1] === id2) || (arr[i][0] === id2 && arr[i][1] === id1)) {
        return false
      }
    }
    return true
  }

  render() {

    return (
      <div>
        <h2>Restrictions</h2>
        {
          this.props.exchange.restrictions && this.props.exchange.restrictions.length > 0
          ? this.props.exchange.restrictions.map(restriction =>
            <div key={`${this.personFinder(restriction[0]).id}-${this.personFinder(restriction[1]).id}`}>{this.personFinder(restriction[0]).firstName} {this.personFinder(restriction[0]).lastName} &  {this.personFinder(restriction[1]).firstName} {this.personFinder(restriction[1]).lastName}<div onClick={this.deleteRestriction} id={`${this.personFinder(restriction[0]).id}-${this.personFinder(restriction[1]).id}`}>Delete</div></div>
          )
          : <span>No Restrictions Made Yet!</span>
        }

        <form>
          <h3>Add a new restriction</h3>
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
          ? <span>Please Select a match</span>
          : <span onClick={this.onAddNew}>Add New Restriction</span>
      }
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
