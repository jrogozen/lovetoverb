import React from 'react'

const UserInputText = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
    changeHandler: React.PropTypes.func.isRequired,
    submitHandler: React.PropTypes.func
  },
  render: function() {
    const { text, changeHandler, pressHandler } = this.props

    return (
      <div className="UserInputText">
        <input
          onChange={changeHandler}
          type="text"
          value={text}
          onKeyDown={pressHandler}
        />
      </div>
    )
  }
})

export default UserInputText