import React, { Component } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'

import { PostList } from './posts'
import { CategoriesLinks } from './categories'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Readable</h1>
        </header>

        <Router>
          <div>
            <h2>Categories</h2>
            <CategoriesLinks />
            <h2>Posts</h2>
            <Route path="/" exact component={PostList} />
            <Route path="/:categoryId" exact component={PostList} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
