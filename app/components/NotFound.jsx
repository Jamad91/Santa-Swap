import React from 'react'
import { Link } from 'react-router'

const NotFound = props => {
  const {pathname} = props.location || {pathname: '<< no path >>'}
  console.error('NotFound: %s not found (%o)', pathname, props);
  return (
      <div className="page-content">
        <div id="denied-access">
          <img src="http://media.tumblr.com/3168ff7903ec0ede7b77c3ece227fa78/tumblr_inline_mw9vlaR79q1sp2a15.gif" />
          <h1 className="header-font">That route doesn't exist, please return to the <Link href="/home">homepage</Link></h1>
        </div>
      </div>
  );
}

export default NotFound
