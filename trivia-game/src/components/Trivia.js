import React from 'react'
import Question from './QuestionData'

class Trivia extends React.Component {
  constructor () {
    super()
    this.state = {
      questions: [],
      currentIndex: 0,
      score: 0,
      answerChecked: null,
      playing: true
    }
  }

  componentDidMount () {
    const url = 'https://opentdb.com/api.php?amount=10&category=' + this.props.category.id
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ questions: data.results, playing: false })
      })
  }

  render () {
    const { category } = this.props
    const { questions, currentIndex, score, answerChecked, playing } = this.state
    const currentQuestion = questions[currentIndex]
    const finishedQuiz = currentIndex === questions.length

    if (playing) {
      return <h1> Playing</h1>
    }
    let showAnswerChecked
    if (answerChecked === true) {
      showAnswerChecked = <h2 className='correct'> Good job!</h2>
    } else if (answerChecked === false) {
      showAnswerChecked = <h2 className='wrong'>Oops, wrong! The answer was <span className='correct'> {questions[currentIndex].correct_answer}</span> </h2>
    }

    if (finishedQuiz) {
      return (
        <div>
          <h1>{category.name}</h1>
          <h2>You scored {score}/{questions.length}</h2>
          <button
            className='again'
            onClick={this.props.handleBack}
          >
          Play again
          </button>
        </div>

      )
    }
    return (
      <div>
        <h1>{category.name}</h1>
        <h2>{showAnswerChecked}</h2>
        <Question
          question={currentQuestion}
          checkAnswer={(correct) => {
            if (this.state.answered) {
              return
            }
            if (correct) {
              this.setState({
                score: this.state.score + 1,
                answered: true,
                previousQuestion: true,
                answerChecked: true
              })
            } else {
              this.setState({
                answered: true,
                answerChecked: false
              })
            }
          }}
        />
        <h2> Score: {score} </h2>
        <div>
          <button
            disabled={!this.state.answered}
            className='nextBtn'
            onClick={() => {
              this.setState({
                currentIndex: currentIndex + 1,
                answerChecked: null,
                answered: false
              })
            }}
          > Next
          </button>
          <button
            className='backBtn'
            onClick={this.props.handleBack}
          >
              Back to All Categories
          </button>
        </div>
      </div>
    )
  }
}

export default Trivia

// previous using useEffect, worked but couldn't get the answers to be right
// export default function QuestionData (props) {
//     const { category } = props
//     const [triviaQuestions, setTriviaQuestions] = useState([])
//     const [currentIndex, setCurrentIndex] = useState(0)
//     const [score, setScore] = useState(0)

//     useEffect(() => {
//       setTriviaQuestions([])
//       if (!category) { return }
//       fetch('https://opentdb.com/api.php?amount=10&category=' + category.id)
//         .then(response => response.json())
//         .then(data => {
//           console.log(data)
//           const questions = data.results.map(question => {
//             return {
//               question: question.question,
//               correct_answer: question.correct_answer,
//               incorrect_answers: question.incorrect_answers
//             }
//           })
//           setTriviaQuestions(questions)
//         })
//     }, [category])

//     let question
//     if (triviaQuestions.length > 0) {
//       question = triviaQuestions[currentIndex]
//     }

//     return (
//       <div className='QuestionData'>
//         <h2>{category.name}</h2>
//         {question && (
//           <div>
//             <div> Question: {question.question} </div>
//             <div>
//               <button className='answers'>{question.correct_answer} </button>
//             </div>
//             <div>
//               <button className='answers'>{question.incorrect_answers}</button>
//             </div>
//           </div>
//         )}

//         <div>
//           {currentIndex < triviaQuestions.length - 1 &&
//             <button className='nextBtn' onClick={() => setCurrentIndex(currentIndex + 1)}>Next Question</button>}
//         </div>

//       </div>
//     )
//   }
