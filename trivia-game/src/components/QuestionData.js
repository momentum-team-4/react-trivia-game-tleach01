import React, { useState, useEffect } from 'react'

// category
// type
// difficulty
// question
// correct_answer
// incorrect_answers

export default function QuestionData (props) {
  const { category } = props
  const [triviaQuestions, setTriviaQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setTriviaQuestions([])
    if (!category) { return }
    fetch('https://opentdb.com/api.php?amount=10&category=' + category.id)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const questions = data.results.map(question => {
          return {
            question: question.question,
            correct_answer: question.correct_answer
          }
        })
        setTriviaQuestions(questions)
      })
  }, [category])

  let question
  if (triviaQuestions.length > 0) {
    question = triviaQuestions[currentIndex]
  }

  return (
    <div className='QuestionData'>
      <h2>{category.name}</h2>

      {question && (
        <div> Question: {question.question} </div>
      )}

      <div>
        {currentIndex > 0 &&
          <button onClick={() => setCurrentIndex(currentIndex - 1)}>Previous Question</button>}
        {' '}
        {currentIndex < triviaQuestions.length - 1 &&
          <button onClick={() => setCurrentIndex(currentIndex + 1)}>Next Question</button>}
      </div>

    </div>
  )
}
