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
    return (
      <div className="content-box" id="plan-form">
        <h1 className="header-font">Plan an Exchange!</h1>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-input">
            <span>What do you want to call it?</span><br />
            <textarea rows="3" cols="30" name="title" value={this.state.title} onChange={this.handleChange} />
            <input type="submit" value="Create" />
          </div>
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
