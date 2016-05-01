import React from 'react'
import { connect } from 'react-redux'

import QuizDisplayCard from '../components/QuizDisplayCard'

import QuizActions from '../actions/QuizActions'

const QuizPage = React.createClass({
  componentDidMount: function() {
    const { dispatch } = this.props

    dispatch(QuizActions.startQuiz())
  },
  render: function() {
    const { verbs, language, currentVerbIndex, correct, wrong, conjugations } = this.props.quiz
    const currentVerb = verbs[currentVerbIndex]
    const selectedConjugation = conjugations[0];

    return (
      <div className="QuizPage" id="QuizPage">
        Quiz Page
        {currentVerb && (
          <QuizDisplayCard
            verb={currentVerb}
            conjugation={selectedConjugation}
          />
        )}
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  quiz: state.quiz
})

export default connect(mapStateToProps)(QuizPage)
