const initState = () => ({
  isPlaying: false,
  verbs: [],
  language: null,
  currentVerb: 0,
  correct: 0,
  wrong: 0
})

const quiz = (state = initState(), action = {}) => {
  const { payload, type, error } = action

  switch (type) {
    'START_QUIZ':
      return Object.assign(initState(), {
        isPlaying: true,
        verbs: payload.verbs,
        language: payload.language
      })
    'RESET_QUIZ':
      return initState()
    'NEXT_QUESTION': // frontend can handle whether next_question should be dispatched
      return Object.assign(initState(), {
        currentVerb: state.currentVerb + 1,
        correct: payload.correct ? state.correct + 1 : state.correct,
        wrong: payload.wrong ? state.wrong + 1 : state.wrong
      })
    default:
      return state
  }
}

export default quiz