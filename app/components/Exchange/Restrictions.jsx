import React, {Component} from 'react'
import {connect} from 'react-redux'
import { restrictPerson } from 'APP/app/reducers/exchanges'

class Restrictions extends Component {

  constructor(props) {
    super(props)

    this.state = {
      person1: 0,
      person2: 0
    }
    this.onSelectPerson = this.onSelectPerson.bind(this)
    this.onAddNew = this.onAddNew.bind(this)
    this.nameFinder = this.nameFinder.bind(this)
  }

  onSelectPerson(e) {
    let newState = {}
    newState[e.target.name] = e.target.value
    console.log(newState);
    this.setState(newState)
  }

  onAddNew(e) {
    console.log(this.state);
  }

  nameFinder(id) {
    let found = this.props.exchange.members.filter(member => {if (id === member.id) { return member}})[0]
    return `${found.firstName} ${found.lastName}`
  }

  render() {

    console.log('here',this.props.exchange);
    return (
      <div>
        <h2>Restrictions</h2>
        {
          this.props.exchange.restrictions
          ? this.props.exchange.restrictions.map(restriction =>
            <div key={`${restriction[0]-restriction[1]}`}>{this.nameFinder(restriction[0])}, {this.nameFinder(restriction[1])}</div>
          )
          : null
        }

        <form>
          <h3>Add a new restriction</h3>
          Person 1: <select name="person1" onChange={this.onSelectPerson}>
            <option value="0" checked>----------------------</option>
            {this.props.exchange.members
              ? this.props.exchange.members.map(member =>
                  <option key={`select-two${member.id}`} value={member.id}>{member.firstName} {member.lastName}</option>
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
        <span onClick={this.onAddNew}>Add New Restriction</span>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state.exchangeReducer.selectedExchange);
  return {
    exchange: state.exchangeReducer.selectedExchange
  }
}

export default connect(mapStateToProps)(Restrictions)
