import React from 'react'
import { connect } from 'react-redux'

const QuizDisplayCard = React.createClass({
  propTypes: {
    verb: React.PropTypes.object
  },
  render: function() {
    const { verb, conjugation } = this.props

    return (
      <section className="QuizDisplayCard">
        <h1>{verb.stem}</h1>
        <div className="definition">({verb.definition})</div>
        <h2>{conjugation}</h2>
      </section>
    )
  }
})

// const mapStateToProps = (state) => ({

// })

export default connect()(QuizDisplayCard)