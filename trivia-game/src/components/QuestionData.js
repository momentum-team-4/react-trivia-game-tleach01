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

  useEffect(() => {
    setTriviaQuestions([])
    if (!category) {return}
    fetch('https://opentdb.com/api.php?amount=10&category=' + category.id)
      .then(response => response.json())
      .then(data => {
        console.log(data)

      })
  }, [category])

  return (
    <div className='QuestionData'>
      <h2>{category.name}</h2>
      <div>  </div>

    </div>
  )
}
