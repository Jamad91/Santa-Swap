import React, { Component } from 'react'
import { connect } from 'react-redux'
import {addPersonToExchange} from 'APP/app/reducers/exchanges'
import { Link } from 'react-router'
import SantaBox from '../SantaBox'

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
          <div className="signedin-body">

            <SantaBox />
          <div>
        <div id="join-title">
          <h1 className="header-font page-greeting">Join {this.props.exchange.title}</h1>
          <div className="links">
            <Link href='/home'>Home</Link>
          </div>
        </div>
        <div className="content-box" id="join-form-box">

        <form id="join-form">
          <div className="join-form-row">
            <div className="join-form-col">
              First Name: <input
                className="join-form-input"
                onChange={this.handleChange}
                name="firstName"
                value={this.state.firstName}
              />
            </div>
            <div className="join-form-col">
              Last Name: <input
                className="join-form-input"
                onChange={this.handleChange}
                name="lastName"
                value={this.state.lastName}
              />
            </div>
          </div>
          <div className="join-form-row">
            <div className="join-form-col">
              Email: <input
                className="join-form-input"
                onChange={this.handleChange}
                name="email"
                value={this.state.email}
              />
            </div>
            <div className="join-form-col">
              Phone Number: <input
                className="join-form-input"
                onChange={this.handleChange}
                name="phone"
                value={this.state.phone}
              />
            </div>
          </div>
        <div className="join-form-row">
          <div className="join-form-col">
            Address Line 1: <input
              className="join-form-input"
              onChange={this.handleChange}
              name="address1"
              value={this.state.address1}
            />
          </div>
          <div className="join-form-col">
            Address Line 2: <input
              className="join-form-input"
              onChange={this.handleChange}
              name="address2"
              value={this.state.address2}
            />
          </div>
        </div>
        <div className="join-form-row single-row">Things you like: <textarea rows="2" cols="43"
            className="join-form-input"
            onChange={this.handleChange}
            name="likes"
            value={this.state.likes}
          /></div>
        <div className="join-form-row single-row">Things you dislike: <textarea rows="2" cols="43"
            className="join-form-input"
            onChange={this.handleChange}
            name="dislikes"
            value={this.state.dislikes}
          /></div>
        <div className="join-form-row single-row">Anything else we should know? <textarea rows="2" cols="43"
            className="join-form-input"
            onChange={this.handleChange}
            name="misc"
            value={this.state.misc}
          /></div>
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

      </div>
      </div>
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
