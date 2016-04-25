import React from 'react'
import { connect } from 'react-redux'

const FrontPage = React.createClass({
  render: function() {
    return (
      <div id="FrontPage container">
        <h2>Front Page</h2>
      </div>
    )
  }
})

export default connect()(FrontPage)