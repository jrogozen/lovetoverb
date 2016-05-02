import requester from '../utils/requester'

export default {
  startQuiz: () => {
    return (dispatch, getState) => {
      return requester('GET', 'verbs')
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            return dispatch({
              type: 'START_QUIZ',
              payload: {
                verbs: json.data,
                language: 'korean',
                conjugations: ['future']
              }
            })
          }
        })
        .catch((err) => ({
          error: err,
          success: false
        }))
    }
  },
  submitAnswer: (correct) => {
    return (dispatch, getState) => {
      const state = getState()
      const { quiz } = state

      dispatch({
        type: 'HANDLE_ANSWER',
        payload: {
          correct,
          wrong: !correct
        }
      })

      if (quiz.currentVerbIndex === quiz.verbs.length - 1) {
        return dispatch({ type: 'END_QUIZ'})
      } else {
        return dispatch({ type: 'NEXT_QUESTION' })
      }
    }
  }
}