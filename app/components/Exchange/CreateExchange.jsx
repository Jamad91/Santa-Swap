import React, {Component} from 'react'
import { connect } from 'react-redux'
import { createExchange } from 'APP/app/reducers/exchanges'

// export default class CreateExchange extends Component {
class CreateExchange extends Component {
  constructor(props) {
    super(props);
    this.state ={
      title: "",
      members: "",
      owner_id: this.props.user.id
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    let newState = {};
    newState[evt.target.name] = evt.target.value;
    newState[evt.target.title] = evt.target.value;
    newState[evt.target.members] = evt.target.value;

    this.setState(newState)
  }

  handleSubmit(evt) {
    console.log(this.state);
    this.state.members = this.state.members.split(',')
    console.log(this.state);
    evt.preventDefault();

    this.props.createExchange(this.state)
    this.setState({
      title: "",
      members: "",
      owner_id: this.props.user.id
    })
  }

  render() {
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
            <textarea rows="2" cols="50" name="members" value={this.state.members} onChange={this.handleChange} />
          </div>

          <input type="submit" value="Create" />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {user: state.auth}
}

export default connect(mapStateToProps, {createExchange})(CreateExchange)
