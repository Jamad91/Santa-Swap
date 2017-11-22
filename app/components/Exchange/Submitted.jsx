import React, { Component } from 'react'
import { Link } from 'react-router'
import SantaBox from '../SantaBox'

export default class Submitted extends Component {
  render() {
    return(
      <div className="page-content" id="submitted">
        <div className="signedin-body">
          <h1 className="header-font">Submitted form! Thank you!</h1><br />
          <h1 className="header-font">Once everybody else has signed up, you'll be getting notified of who you're getting a present for.</h1><br />
          <h1 className="header-font">So, stay tuned and in the meantime, merry holidays!</h1><br /><br />
          <div id="submitted-home-link">
            <Link href={'/'}>Home</Link>
          </div>
        </div>
      </div>
    )
  }
}
