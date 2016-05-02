import React from 'react'
import { connect } from 'react-redux'

import QuizDisplayCard from '../components/QuizDisplayCard'
import QuizResults from '../components/QuizResults'

import QuizActions from '../actions/QuizActions'

const QuizPage = React.createClass({
  componentDidMount: function() {
    const { dispatch } = this.props

    dispatch(QuizActions.startQuiz())
  },
  render: function() {
    const { verbs, language, currentVerbIndex, correct, wrong, conjugations, isPlaying } = this.props.quiz
    const currentVerb = verbs[currentVerbIndex]
    const selectedConjugation = conjugations[0];
    console.log('rendering quiz page!!')

    return (
      <div className="QuizPage" id="QuizPage">
        Quiz Page

        {currentVerb && isPlaying && (
          <QuizDisplayCard
            verb={currentVerb}
            conjugation={selectedConjugation}
          />
        )}

        {currentVerb && !isPlaying && (
          <QuizResults />
        )}
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  quiz: state.quiz
})

export default connect(mapStateToProps)(QuizPage)
