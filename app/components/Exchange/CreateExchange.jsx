import React, {Component} from 'react'
import { connect } from 'react-redux'
import { createExchange } from 'APP/app/reducers/exchanges'

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
    this.handleNameClick = this.handleNameClick.bind(this);
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

  handleNameClick(evt) {
    let potentialMembers = []
    console.log(evt);
  }

  handleSubmit(evt) {
    // this.state.searchMembers = this.state.searchMembers.split(',').map(num => parseInt(num))
    evt.preventDefault();
    console.log(this.state);

    let newState = {
      title: this.state.title,
      members: this.state.members,
      owner_id: this.props.user.id
    }

    this.props.createExchange(newState)
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
              <span onClick={() => {
                  let memberIds = this.state.members.map(person => person.id)
                  if (!memberIds.includes(person.id)) {this.state.members.push(person.id)}
                }}
              >{person.name} +</span></div>)
                : null
              }

          <input type="submit" value="Create" />
        </form>
      </div>
    )
  }
}


// this.props.addPersonToExchange(person.id, this.props.exchange.id)
// this.setState({
//   members:
// })
function mapStateToProps(state) {
  return {
    user: state.auth,
    allUsers: state.userReducer.users
  }
}

export default connect(mapStateToProps, {createExchange})(CreateExchange)
