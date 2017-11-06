import React, {Component} from 'react'
import {connect} from 'react-redux'
import { restrictPerson } from 'APP/app/reducers/exchanges'

class Restrictions extends Component {

  constructor(props) {
    super(props)

    this.onFieldChange = this.onFieldChange.bind(this)
    this.onAddNew = this.onAddNew.bind(this)
    this.onSave = this.onSave.bind(this)
    this.nameFinder = this.nameFinder.bind(this)
  }


  onFieldChange() {
    person1
  }

  onAddNew() {

  }

  onSave() {

  }

  nameFinder(id) {
    let found = this.props.exchange.members.filter(member => {if (id === member.id) { return member}})[0]
    console.log(found);
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
            <div>{this.nameFinder(restriction[0])}, {this.nameFinder(restriction[1])}</div>
          )
          : null
        }

        <form></form>
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
