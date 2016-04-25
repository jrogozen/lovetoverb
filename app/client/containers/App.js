import React from 'react'
import { connect } from 'react-redux'

const App = React.createClass({
  render: function() {
    return (
      <div className="App">
        <h1>App</h1>
        {React.cloneElement(this.props.children)}
      </div>
    )
  }
})

export default connect()(App)