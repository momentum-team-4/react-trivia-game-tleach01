import React, { useState, useEffect } from 'react'
import './App.css'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      pickedCategory: null,
      categories: []
    }
  }

  componentDidMount () {
    fetch('https://opentdb.com/api_category.php')
      .then(response => response.json())
      .then(data => {
        this.setState({ categories: data.trivia_categories })
      })
  }

  clearPicked () {
    this.setState({ pickedCategory: null })
  }

  render () {
    const categories = this.state.categories
    let triviaApp
    if (this.state.pickedCategory === null) {
      triviaApp = (
        <div className='triviaApp'>
          <h2>Pick a Category! </h2>
          <ul className='categories'>
            {categories.map(category => (
              <li key={category.id}>
                <button onClick={() => this.setState({ pickedCategory: category })}> 
                  <strong>{category.name}</strong>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )
    }

    return (
      <div className='triviaApp'>
        {triviaApp}
      </div>
    )
  }
}

export default App
