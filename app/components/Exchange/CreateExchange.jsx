import React, {Component} from 'react'
import { connect } from 'react-redux'
import { createExchange } from 'APP/app/reducers/exchanges'
// import User from '../User'


// export default class CreateExchange extends Component {
class CreateExchange extends Component {
  constructor(props) {
    super(props);
    this.state ={
      title: "",
      searchMembers: "",
      members: [],
      owner_id: this.props.user.id
    }
    this.findMatches = this.findMatches.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  findMatches(wordToMatch, people) {
    return people.filter(person => {
      const regex = new RegExp(wordToMatch, 'gi')
      if (person.name.match(regex)) {
        return person
      }
    })
  }

  handleChange(evt) {
    let newState = {};
    newState[evt.target.name] = evt.target.value;
    newState[evt.target.title] = evt.target.value;
    newState[evt.target.searchMembers] = evt.target.value;

    this.setState(newState)
  }

  handleSubmit(evt) {
    this.state.searchMembers = this.state.searchMembers.split(',').map(num => parseInt(num))
    evt.preventDefault();

    this.props.createExchange(this.state)
    this.setState({
      title: "",
      searchMembers: "",
      members: [],
      owner_id: this.props.user.id
    })
    window.location.reload()
  }

  render() {
    let searchResults;
    this.state.searchMembers.length > 0
      ? searchResults = this.findMatches(this.state.searchMembers, this.props.allUsers)
      : searchResults = ''

    return (
      <div>
        <h3>Plan an Exchange!</h3>
        <form onSubmit={ this.handleSubmit }>
          <div>
            Title
            <textarea rows="2" cols="50" name="title" value={this.state.title} onChange={this.handleChange} />
          </div>
          <div>
            Members
            <textarea rows="2" cols="50" name="searchMembers" value={this.state.searchMembers} onChange={this.handleChange} />
          </div>
          {
            searchResults.length > 0
            ? searchResults.map(person => <div key={person.id}>
              <button
                >{person.name} +</button></div>)
                : null
              }

          <input type="submit" value="Create" />
        </form>
      </div>
    )
  }
}

// onClick={() => {
//   this.props.addPersonToExchange(person.id, this.props.exchange.id)
//   this.setState({
//     members:
//   })
// }}
function mapStateToProps(state) {
  return {
    user: state.auth,
    allUsers: state.userReducer.users
  }
}

export default connect(mapStateToProps, {createExchange})(CreateExchange)
