import React from 'react'

// category
// question
// correct_answer
// incorrect_answers

class Question extends React.Component {
  shouldComponentUpdate (nextProps) {
    if (this.props.question === nextProps.question) {
      return false
    }
    return true
  }

  render () {
    const { question, checkAnswer } = this.props
    let answers = []
    answers.push(question.correct_answer)
    answers = answers.concat(question.incorrect_answers)

    return (
      <div className='question'>
        <div>
          <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
        </div>
        <ul>
          {answers.map(answer => (
            <li key={answer}>
              <button
                className='answers'
                onClick={() => checkAnswer(answer === question.correct_answer)}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Question
