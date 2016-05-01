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
  }
}