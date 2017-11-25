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
    if (this.state.misc.length === 0) {
      this.setState({misc: "n/a"})
    }

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
              <span className="join-form-text">First Name:</span>
              <input
                className="join-form-input"
                onChange={this.handleChange}
                name="firstName"
                value={this.state.firstName}
              />
            </div>
            <div className="join-form-col">
              <span className="join-form-text">Last Name:</span>
               <input
                className="join-form-input"
                onChange={this.handleChange}
                name="lastName"
                value={this.state.lastName}
              />
            </div>
          </div>
          <div className="join-form-row">
            <div className="join-form-col">
              <span className="join-form-text">Email:</span>
              <input
                className="join-form-input"
                onChange={this.handleChange}
                name="email"
                value={this.state.email}
              />
            </div>
            <div className="join-form-col">
              <span className="join-form-text">Phone Number:</span>
              <input
                className="join-form-input"
                onChange={this.handleChange}
                name="phone"
                value={this.state.phone}
              />
            </div>
          </div>
        <div className="join-form-row">
          <div className="join-form-col">
            <span className="join-form-text">Address Line 1:</span>
            <input
              className="join-form-input"
              onChange={this.handleChange}
              name="address1"
              value={this.state.address1}
            />
          </div>
          <div className="join-form-col">
            <span className="join-form-text">Address Line 2:</span>
            <input
              className="join-form-input"
              onChange={this.handleChange}
              name="address2"
              value={this.state.address2}
            />
          </div>
        </div>
        <div className="join-form-row single-row">
          <span className="join-form-text">Things you like:</span>
          <textarea rows="3" cols="40"
            className="join-form-input"
            onChange={this.handleChange}
            name="likes"
            value={this.state.likes}
            placeholder="ex: sports, candy, hip hop, Die Hard"
          />
        </div>
        <div className="join-form-row single-row">
          <span className="join-form-text">Things you dislike:</span>
          <textarea rows="3" cols="40"
            className="join-form-input"
            onChange={this.handleChange}
            name="dislikes"
            value={this.state.dislikes}
            placeholder="ex: golden colored things, paintings, non practical things"
          />
        </div>
        <div className="join-form-row single-row">
          <span className="join-form-text">Anything else we should know?</span>
          <textarea rows="3" cols="40"
            className="join-form-input"
            onChange={this.handleChange}
            name="misc"
            value={this.state.misc}
            placeholder="ex: please include a note, prefer delivered via mail rather than in person if applicable"
          />
        </div>
        {
          this.state.firstName &&
          this.state.lastName &&
          this.state.email &&
          this.state.phone &&
          this.state.address1 &&
          this.state.address2 &&
          this.state.likes &&
          this.state.dislikes
            ? <button id="join-button" onClick={this.handleSubmit}>Join!</button>
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
