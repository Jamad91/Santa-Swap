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
      houseNum: "",
      apartment: "",
      city: "",
      state: "",
      zip: "",
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
      houseNum: this.state.houseNum,
      apartment: this.state.apartment,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
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
            <div id="join-title">
              <h1 className="header-font page-greeting">Join {this.props.exchange.title}</h1>
              <div className="links">
                <Link href='/home'>Home</Link>
              </div>
            </div>
            {
              this.props.exchange.sentList
              ? <h2 className="header-font" style={{paddingBottom: '20%', paddingTop: "5%", marginLeft: "7%"}}>I'm sorry but {this.props.exchange.title} can no longer be joined. <br />Happy Holidays!</h2>
              : <div>
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
                      <span className="join-form-text">Street:</span>
                      <input
                        className="join-form-input"
                        onChange={this.handleChange}
                        name="houseNum"
                        value={this.state.houseNum}
                        />
                    </div>
                    <div className="join-form-col">
                      <span className="join-form-text">(Optional) Apartment:</span>
                      <input
                        className="join-form-input"
                        onChange={this.handleChange}
                        name="apartment"
                        value={this.state.apartment}
                        />
                    </div>
                  </div>
                  <div className="join-form-row">
                    <div className="join-form-col">
                      <span className="join-form-text">City:</span>
                      <input
                        className="join-form-input"
                        onChange={this.handleChange}
                        name="city"
                        value={this.state.city}
                        />
                    </div>
                    <div className="join-form-col">
                      <span className="join-form-text">State:</span>
                      <input
                        className="join-form-input"
                        onChange={this.handleChange}
                        name="state"
                        value={this.state.state}
                        />
                    </div>
                  </div>

                  <div className="join-form-row">
                    <div className="join-form-col">
                      <span className="join-form-text">Zip Code:</span>
                      <input
                        className="join-form-input"
                        onChange={this.handleChange}
                        name="zip"
                        value={this.state.zip}
                        style={{padding: "0.5%"}}
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
                  this.state.houseNum &&
                  this.state.city &&
                  this.state.state &&
                  this.state.zip &&
                  this.state.likes &&
                  this.state.dislikes
                    ? <button id="join-button" onClick={this.handleSubmit}>Join!</button>
                    : null
                }
                </form>

              </div>
              </div>
            }
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
