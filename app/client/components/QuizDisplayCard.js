import React from 'react'
import { connect } from 'react-redux'

import UserInputText from './UserInputText'

import QuizActions from '../actions/QuizActions'

const QuizDisplayCard = React.createClass({
  propTypes: {
    verb: React.PropTypes.object
  },
  getInitialState: function() {
    return {
      answerText: ''
    }
  },
  submitHandler: function(event) {
    const { conjugation, verb, dispatch } = this.props
    const { answerText } = this.state

    if (event.keyCode === 13) {
      event.preventDefault()

      this.setState({
        answerText: ''
      })

      if (answerText === verb[conjugation]) {
        dispatch(QuizActions.submitAnswer(true))
      } else {
        dispatch(QuizActions.submitAnswer(false))
      }
    }
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
          pressHandler={this.submitHandler}
          text={answerText}
        />
        <button onClick={this.submitHandler}>Enter</button>
      </section>
    )
  }
})

export default connect()(QuizDisplayCard)