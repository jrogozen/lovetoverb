import React from 'react'
import { connect } from 'react-redux'

import UserInputText from './UserInputText'

const QuizDisplayCard = React.createClass({
  propTypes: {
    verb: React.PropTypes.object
  },
  getInitialState: function() {
    return {
      answerText: ''
    }
  },
  pressHandler: function() {
    alert(this.state.answerText)
  },
  render: function() {
    const { verb, conjugation } = this.props
    const { answerText } = this.state

    return (
      <section className="QuizDisplayCard">
        <h1>{verb.stem}</h1>
        <div className="definition">({verb.definition})</div>
        <h2>{conjugation}</h2>
        <UserInputText
          changeHandler={
            (event) => {
              this.setState({
                answerText: event.target.value
              })
            }
          }
          pressHandler={
            (event) => {
              if (event.keyCode === 13) {
                alert(this.state.answerText)
              }
            }
          }
          text={answerText}
        />
        <button onClick={this.submitHandler}>Enter</button>
      </section>
    )
  }
})

// const mapStateToProps = (state) => ({

// })

export default connect()(QuizDisplayCard)