import React from 'react'
import './App.css'
import Trivia from './components/Trivia'

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
    if (this.state.pickedCategory !== null) {
      triviaApp = (
        <div>
          <Trivia
            questions={this.state.questions}
            category={this.state.pickedCategory}
            handleBack={() => this.clearPicked()}
          />
        </div>
      )
    } else {
      triviaApp = (
        <div>
          <h1> Trivia Game </h1>
          <h2>Pick a category to start!</h2>
          <ul className='categories'>
            {categories.map(category => (
              <li key={category.id}>
                <button className='categoryBtn' onClick={() => this.setState({ pickedCategory: category })}> 
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
