import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Submitted extends Component {
  render() {
    return(
      <div>
        <div>Submitted form! You'll hear back soon!</div>
        <Link href={'/'}>Home</Link>
      </div>
    )
  }
}
