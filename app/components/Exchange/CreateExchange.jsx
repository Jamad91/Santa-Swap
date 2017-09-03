import React, {Component} from 'react'
import { connect } from 'react-redux'
import { createExchange } from 'APP/app/reducers/exchanges'

class CreateExchange extends Component {
  constructor(props) {
    super(props);
    this.state ={
      title: "",
      searchMembers: "",
      members: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    let newState = {};
    newState[evt.target.name] = evt.target.value;
    newState[evt.target.title] = evt.target.value;
    newState[evt.target.searchMembers] = evt.target.value;
    this.setState(newState)
  }

  handleSubmit(evt) {
    evt.preventDefault();

    let newState = {
      title: this.state.title,
      members: this.state.members
    }

    this.props.createExchange(newState)
    this.setState({
      title: "",
      searchMembers: "",
      members: []
    })
    window.location.reload()
  }

  render() {
    console.log(this.state);
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
            <textarea rows="2" cols="50" name="searchMembers" onChange={this.handleChange} />
          </div>
          <input type="submit" value="Create" />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps, {createExchange})(CreateExchange)
