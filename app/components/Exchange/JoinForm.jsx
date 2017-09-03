import React, { Component } from 'react'
import { connect } from 'react-redux'
import {addPersonToExchange} from 'APP/app/reducers/exchanges'

class JoinForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: ""
    }
    // lastName: "",
    // email: "",
    // phone: "",
    // address1: "",
    // address2: "",
    // likes: "",
    // dislikes: "",
    // misc: ""

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    let newState = {}
    // console.log(newState);

    newState[e.target.name] = e.target.value;
    // newState[e.target.firstName] = e.target.value
    // newState[e.target.lastName] = e.target.value
    // newState[e.target.email] = e.target.value
    // newState[e.target.phone] = e.target.value
    // newState[e.target.address1] = e.target.value
    // newState[e.target.address2] = e.target.value
    // newState[e.target.likes] = e.target.value
    // newState[e.target.dislikes] = e.target.value
    // newState[e.target.misc] = e.target.value

    this.setState(newState)
  }

  handleSubmit(e) {
    e.preventDefault()

    let newState = {
      firstName: this.state.firstName
    }
    // lastName: this.state.lastName,
    // email: this.state.email,
    // phone: this.state.phone,
    // address1: this.state.address1,
    // address2: this.state.address2,
    // likes: this.state.likes,
    // dislikes: this.state.dislikes,
    // misc: this.state.misc

    this.props.addPersonToExchange(newState)

    this.setState({
      firstName: ""
    })
    // lastName: "",
    // email: "",
    // phone: "",
    // address1: "",
    // address2: "",
    // likes: "",
    // dislikes: "",
    // misc: ""
  }

  render() {
    // console.log(this.props.router);
    // let exchangeId = parseInt(window.location.href.split('/')[4])
    console.log(this.state);
    return (
      <div>
        <h1>Join {this.props.exchange.title}</h1>
        {this.props.exchange.members
          ? this.props.exchange.members.map(member => {
            return !member
              ? <div>Null</div>
              : <div>{member.firstName}</div>
          })
          : null
        }
        <form>
          <input
            onChange={this.handleChange} placeholder="First Name"
            name="firstName"
            value={this.state.firstName}/>
          <span onClick={() => {this.props.addPersonToExchange(this.props.exchange.id, this.state)}}>Go</span>
        </form>
      </div>
    )
  }
}

// <input onChange={this.handleChange} placeholder="Last Name"></input><br />
// <input onChange={this.handleChange} placeholder="Email"></input>
// <input onChange={this.handleChange} placeholder="Phone"></input><br />
// <input onChange={this.handleChange} placeholder="Address Line 1"></input>
// <input onChange={this.handleChange} placeholder="Address Line 2"></input><br />
// <textarea rows="2" cols="50" placeholder="likes" value={this.state.likes} onChange={this.handleChange} /><br />
// <textarea rows="2" cols="50" placeholder="dislikes" value={this.state.dislikes} onChange={this.handleChange} /><br />
// <textarea rows="2" cols="50" placeholder="misc" value={this.state.misc} onChange={this.handleChange} />

function mapStateToProps(state) {
  return {
    exchange: state.exchangeReducer.selectedExchange
  }
}

export default connect(mapStateToProps,{addPersonToExchange})(JoinForm)
