import React, { Component } from 'react'
import { connect } from 'react-redux'
import {addPersonToExchange} from 'APP/app/reducers/exchanges'
import { Link } from 'react-router'

class JoinForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      likes: "",
      dislikes: "",
      misc: "",
      restricted: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    let newState = {}
    newState[e.target.name] = e.target.value;
    this.setState(newState)
  }

  handleSubmit(e) {
    e.preventDefault()

    let newState = {
      id: Math.floor(Math.random() * 100000) + 1,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      address1: this.state.address1,
      address2: this.state.address2,
      likes: this.state.likes,
      dislikes: this.state.dislikes,
      misc: this.state.misc
    }

    this.props.addPersonToExchange(this.props.exchange.id, newState)

    window.location.href = `${window.location.origin}/submitted`
  }

  render() {
    return (
      <div>
        <div className="page-content">
          <div className="main-content">
        <h1 className="header-font">Join {this.props.exchange.title}</h1>
        <form>
          <input
            onChange={this.handleChange}
            placeholder="First Name"
            name="firstName"
            value={this.state.firstName}
          />
          <input
            onChange={this.handleChange}
            placeholder="Last Name"
            name="lastName"
            value={this.state.lastName}
          /><br />
          <input
            onChange={this.handleChange}
            placeholder="Email"
            name="email"
            value={this.state.email}
          />
          <input
            onChange={this.handleChange}
            placeholder="Phone"
            name="phone"
            value={this.state.phone}
          /><br />
          <input
            onChange={this.handleChange}
            placeholder="Address Line 1"
            name="address1"
            value={this.state.address1}
          />
          <input
            onChange={this.handleChange}
            placeholder="Address Line 2"
            name="address2"
            value={this.state.address2}
          /><br />
          <textarea rows="2" cols="50"
            onChange={this.handleChange}
            placeholder="likes"
            name="likes"
            value={this.state.likes}
          /><br />
          <textarea rows="2" cols="50"
            onChange={this.handleChange}
            placeholder="dislikes"
            name="dislikes"
            value={this.state.dislikes}
          /><br />
          <textarea rows="2" cols="50"
            onChange={this.handleChange}
            placeholder="misc"
            name="misc"
            value={this.state.misc}
          /><br />
        {
          this.state.firstName &&
          this.state.lastName &&
          this.state.email &&
          this.state.phone &&
          this.state.address1 &&
          this.state.address2 &&
          this.state.likes &&
          this.state.dislikes &&
          this.state.misc
            ? <button onClick={this.handleSubmit}>Go</button>
            : null
        }
        </form>
        <Link href='/home'>Home</Link>
      </div>
      </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    exchange: state.exchangeReducer.selectedExchange
  }
}

export default connect(mapStateToProps,{addPersonToExchange})(JoinForm)
