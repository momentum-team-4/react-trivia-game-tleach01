import React, { useState, useEffect } from 'react'
import './App.css'
import QuestionData from './components/QuestionData'

function App () {
  const [triviaCategories, setTriviaCategories] = useState([])
  const [pickedTriviaCategory, setPickedTriviaCategory] = useState(null)

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(response => response.json())
      .then(data => {
        console.log(data.trivia_categories)

        setTriviaCategories(data.trivia_categories)
      })
  }, [])

  if (pickedTriviaCategory) {
    return (
      <div>
        <QuestionData category={pickedTriviaCategory} />
        <div>
          <button className='backBtn' onClick={() => setPickedTriviaCategory(null)}>
            Back to all categories!
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='triviaApp'>
      <h1>Trivia Game</h1>
      <h2><em>Pick a category to get started!</em></h2>
      <ul>
        {triviaCategories.map(category => (
          <li key={category.id}>
            <button className='categoryBtn' onClick={() => setPickedTriviaCategory(category)}>
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
