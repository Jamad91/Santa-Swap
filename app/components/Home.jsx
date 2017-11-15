import React, {Component} from 'react';
import WhoAmI from './WhoAmI';
import {connect} from 'react-redux';
import { Link } from 'react-router'
import CreateExchange from './Exchange/CreateExchange'
import Exchanges from './Exchange/Exchanges'
import { LoginInfo } from '../main.jsx'
import SantaBox from './SantaBox'

import {fetchUserExchanges} from '../reducers/exchanges'

import store from '../store'

class Home extends Component {
  render() {
    return (
      <div className="page-content">
        {
          this.props.user
            ? <div>
                <h1 id="greeting">Welcome, {this.props.user.name}, to Santa Swap!</h1>
                <div className="main-content">
                  <LoginInfo />
                  <Exchanges/>
                  <CreateExchange />
                </div>
              </div>
            : <div>
                <div id="home-columns">
                  <div id="home-left">
                    <SantaBox />
                    <div id="mission-statement">
                      <p>Santa Swap is a tool that'll allow you to organize a secret santa gift exchange while still being a part of the fun! With Santa Swap you can customize your gift exchange to your liking! You're able to set up any restrictions you might need between significan others, family members, exes, etc.</p><br />
                      <p>All gift givers have to do is fill out a form, and then when the list of people is filled up to your content, Santa Swap will notify everyone who they have to get a present for!</p><br />
                      <p>Happy holidays!</p>
                    </div>
                  </div>
                  <div id="home-right">
                    <div id="login-box">
                      <h2>Please log in!</h2>
                      <LoginInfo />
                    </div>
                  </div>
                </div>
              </div>
        }
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return ({
    user: state.auth
  })
}

export default connect(mapStateToProps)(Home)
