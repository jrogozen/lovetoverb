import React from 'react'
import { connect } from 'react-redux'

const FrontPage = React.createClass({
  render: function() {
    return (
      <div className="FrontPage container">
        <h2>Front Pages</h2>
      </div>
    )
  }
})

export default connect()(FrontPage)