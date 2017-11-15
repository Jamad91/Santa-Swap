import React, { Component } from 'react'

export default class SantaBox extends Component {
  render() {
    return(
      <div id="santa-box">
        <div id="present-box">
          <div className="stripe"></div>
        </div>
        <div id="santa-hat">
          <div id="pom-pom"></div>
          <div id="hat-body"></div>
          <div id="hat-brim"></div>
        </div>
        <div id="santa-head">
          <div id="left-eye">
            <div className="eye-glimmer"></div>
          </div>
          <div id="right-eye">
            <div className="eye-glimmer"></div>
          </div>
          <div id="nose"></div>
          <div id="beard"></div>
        </div>
      </div>
    )
  }
}
